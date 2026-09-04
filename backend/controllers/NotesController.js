const Notes = require("../models/NotesModel");
const { google } = require('googleapis');
const path = require('path');
const stream = require('stream');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');
const getDataUri = require('../utils/dataUri');

// Setup Google Auth if cred.json exists
const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

let auth = null;
try {
    if (fs.existsSync(KEYFILEPATH)) {
        auth = new google.auth.GoogleAuth({
            keyFile: KEYFILEPATH,
            scopes: SCOPES,
        });
    }
} catch (e) {
    console.warn("Google Auth init warning:", e.message);
}

const uploadNotes = async (req, res) => {
    try {
        const { postedBy, branch, semester, subject } = req.body;
        const file = req.file;

        if (!postedBy || !file) {
            return res.status(400).json({ message: 'PostedBy and file upload are required fields.' });
        }

        let fileUrl = '';
        let fileName = file.originalname || 'document.pdf';
        let uploadedViaDrive = false;

        // 1. Try Google Drive if auth is available
        if (auth) {
            try {
                const bufferStream = new stream.PassThrough();
                bufferStream.end(file.buffer);

                const driveParams = {
                    media: {
                        mimeType: file.mimetype || 'application/pdf',
                        body: bufferStream,
                    },
                    requestBody: {
                        name: file.originalname,
                    },
                    fields: "id,name"
                };

                if (process.env.GOOGLE_DRIVE_PARENT && process.env.GOOGLE_DRIVE_PARENT !== 'your_google_drive_folder_id') {
                    driveParams.requestBody.parents = [process.env.GOOGLE_DRIVE_PARENT];
                }

                const { data } = await google.drive({ version: "v3", auth }).files.create(driveParams);

                if (data && data.id) {
                    fileUrl = `https://drive.google.com/file/d/${data.id}/view`;
                    fileName = data.name || file.originalname;
                    uploadedViaDrive = true;
                }
            } catch (driveError) {
                console.error('Google Drive upload failed, falling back to Cloudinary:', driveError.message);
            }
        }

        // 2. Fallback to Cloudinary if Google Drive failed or auth was unavailable
        if (!uploadedViaDrive) {
            const fileUri = getDataUri(file);
            const cloudResult = await cloudinary.uploader.upload(fileUri.content, {
                folder: 'noteshaala_notes',
                resource_type: 'auto',
                public_id: `${Date.now()}_${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`,
            });

            fileUrl = cloudResult.secure_url;
            fileName = file.originalname;
        }

        const newNotes = new Notes({
            postedBy,
            branch,
            semester,
            subject,
            file: fileUrl,
            fileName: fileName,
        });

        await newNotes.save();
        return res.status(200).json(newNotes);
    }
    catch (error) {
        console.error('Error in uploadNotes:', error.message);
        return res.status(500).json({ message: error.message || 'Server error while uploading notes.' });
    }
};

// //get tall notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find()
        if (!notes) return res.status(400).json({ error: "Notes not found" });

        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

// //get the specific post by id
const getNotes = async (req, res) => {
    const { branch } = req.params
    try {
        const notes = await Notes.find({ branch })
        if (!notes) return res.status(400).json({ error: "Notes not found" });

        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}


const getNotesSem = async (req, res) => {
    const { branch, semester } = req.params;
    try {
        // Find notes based on branch and semester
        const notes = await Notes.find({ branch: branch, semester: semester });

        // Check if notes were found
        // if (notes.length === 0) {
        //     return res.status(404).json({ error: "Notes not found" });
        // }

        // If notes found, return them
        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

const getNotesSemSub = async (req, res) => {
    const { branch, semester, subject } = req.params;
    try {
        // Find notes based on branch and semester
        const notes = await Notes.find({ branch: branch, semester: semester, subject: subject });

        // Check if notes were found
        if (notes.length === 0) {
            return res.status(404).json({ error: "Notes not found" });
        }

        // If notes found, return them
        res.status(200).json(notes);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in getNotes', error.message)
    }
}

// //delete the specific post by id 
// const deletePost = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);

//         if (!post) {
//             return res.status(404).json({ message: 'Post not Found' });
//         }

//         if (post.postedBy.toString() !== req.user._id.toString()) {
//             return res.status(400).json({ message: 'Unauthorized to delete post' });
//         }

//         await Post.findByIdAndDelete(req.params.id);

//         res.status(200).json({ message: 'Post Deleted successfull' })
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//         console.log('Error in deletePost', error.message)
//     }
// }

module.exports = { uploadNotes,getAllNotes, getNotes, getNotesSem, getNotesSemSub };