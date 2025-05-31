const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const imageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }

    // In production, you would upload to cloud storage (S3, etc.)
    // For now, we'll just return the local path
    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(httpStatus.OK).json({
      status: 'success',
      data: {
        imageUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  imageUpload,
};