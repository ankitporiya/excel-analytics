const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FileUpload',
    required: true
  },
  chartName: {
    type: String,
    required: true
  },
  chartType: {
    type: String,
    enum: ['bar', 'line', 'pie', 'scatter', 'column3d'],
    required: true
  },
  xAxis: {
    type: String,
    required: true
  },
  yAxis: {
    type: String,
    required: true
  },
  chartData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chart', chartSchema);