import mongoose from 'mongoose';

const PillarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  profileImages: [{
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(v) {
        // Accept string or object with url
        return typeof v === 'string' || (typeof v === 'object' && v !== null && 'url' in v && typeof v.url === 'string');
      },
      message: 'profileImages must be a string or an object with a url field.'
    }
  }],
  designation: { type: String },
  about: { type: String },
  experience: { type: String },
  projects: [{ type: mongoose.Schema.Types.Mixed }],
  expertise: [{ type: mongoose.Schema.Types.Mixed }],
  skills: [{ type: mongoose.Schema.Types.Mixed }],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Pillar || mongoose.model('Pillar', PillarSchema);
