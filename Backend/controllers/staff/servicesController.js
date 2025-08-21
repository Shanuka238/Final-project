const Service = require('../../models/Service');

exports.addService = async (req, res) => {
  try {
    const { name, type, description, imageUrl, details, photographer, keyFeatures } = req.body;
    if (!name || !type) return res.status(400).json({ error: 'Service name and type are required' });
    const serviceData = { name, type, description, imageUrl, details };
    if (Array.isArray(keyFeatures)) serviceData.keyFeatures = keyFeatures;
    if (type === 'Photographer' && photographer) {
      serviceData.photographer = {
        name: photographer.name,
        rating: photographer.rating
      };
    }
    const service = new Service(serviceData);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add service' });
  }
};


exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.serviceId);
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
};

exports.editService = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.keyFeatures && Array.isArray(req.body.keyFeatures)) {
      updateData.keyFeatures = req.body.keyFeatures;
    }
    const updated = await Service.findByIdAndUpdate(
      req.params.serviceId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to edit service' });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};
