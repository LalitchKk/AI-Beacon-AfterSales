import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Beacon } from '../../types';

interface BeaconModalProps {
  beacon: Beacon | null;
  onSave: (beaconData: Partial<Beacon>) => void;
  onClose: () => void;
}

const BeaconModal: React.FC<BeaconModalProps> = ({ beacon, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    macAddress: '',
    zoneId: '',
    zoneName: '',
    status: 'inactive' as const,
    batteryLevel: 100
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (beacon) {
      setFormData({
        name: beacon.name,
        macAddress: beacon.macAddress,
        zoneId: beacon.zoneId,
        zoneName: beacon.zoneName,
        status: beacon.status,
        batteryLevel: beacon.batteryLevel
      });
    }
  }, [beacon]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Beacon name is required';
    if (!formData.macAddress) newErrors.macAddress = 'MAC address is required';
    if (!formData.zoneId) newErrors.zoneId = 'Zone ID is required';
    if (!formData.zoneName) newErrors.zoneName = 'Zone name is required';
    if (formData.batteryLevel < 0 || formData.batteryLevel > 100) {
      newErrors.batteryLevel = 'Battery level must be between 0 and 100';
    }

    // MAC address validation
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (formData.macAddress && !macRegex.test(formData.macAddress)) {
      newErrors.macAddress = 'Please enter a valid MAC address (e.g., 00:1A:2B:3C:4D:5E)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {beacon ? 'Edit Beacon' : 'Add New Beacon'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beacon Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., Entrance Beacon #1"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                MAC Address *
              </label>
              <input
                type="text"
                value={formData.macAddress}
                onChange={(e) => handleInputChange('macAddress', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.macAddress ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="00:1A:2B:3C:4D:5E"
              />
              {errors.macAddress && <p className="mt-1 text-sm text-red-600">{errors.macAddress}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone ID *
              </label>
              <input
                type="text"
                value={formData.zoneId}
                onChange={(e) => handleInputChange('zoneId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.zoneId ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Z001"
              />
              {errors.zoneId && <p className="mt-1 text-sm text-red-600">{errors.zoneId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zone Name *
              </label>
              <input
                type="text"
                value={formData.zoneName}
                onChange={(e) => handleInputChange('zoneName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.zoneName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Main Entrance"
              />
              {errors.zoneName && <p className="mt-1 text-sm text-red-600">{errors.zoneName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Battery Level (%) *
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.batteryLevel}
                onChange={(e) => handleInputChange('batteryLevel', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.batteryLevel ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="100"
              />
              {errors.batteryLevel && <p className="mt-1 text-sm text-red-600">{errors.batteryLevel}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {beacon ? 'Update Beacon' : 'Add Beacon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BeaconModal;