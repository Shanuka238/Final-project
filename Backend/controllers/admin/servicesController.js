const Service = require('../../models/Service');

// Add a new service
exports.addService = async (req, res) => {
  try {
    const { name, type, description, imageUrl, details, photographer } = req.body;
    if (!name || !type) return res.status(400).json({ error: 'Service name and type are required' });
    const serviceData = { name, type, description, imageUrl, details };
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

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};
