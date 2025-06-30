import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BannerRequest } from '../../types';
import { mockSales } from '../../data/mockData';

interface BannerModalProps {
  banner: BannerRequest | null;
  onSave: (bannerData: Partial<BannerRequest>) => void;
  onClose: () => void;
}

const BannerModal: React.FC<BannerModalProps> = ({ banner, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    saleId: '',
    customerName: '',
    bannerType: '',
    priority: 'medium' as const,
    status: 'pending' as const
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (banner) {
      setFormData({
        saleId: banner.saleId,
        customerName: banner.customerName,
        bannerType: banner.bannerType,
        priority: banner.priority,
        status: banner.status
      });
    }
  }, [banner]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.saleId) newErrors.saleId = 'Sale ID is required';
    if (!formData.customerName) newErrors.customerName = 'Customer name is required';
    if (!formData.bannerType) newErrors.bannerType = 'Banner type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSaleChange = (saleId: string) => {
    const selectedSale = mockSales.find(sale => sale.id === saleId);
    setFormData(prev => ({
      ...prev,
      saleId,
      customerName: selectedSale?.customerName || ''
    }));
    if (errors.saleId) {
      setErrors(prev => ({ ...prev, saleId: '' }));
    }
  };

  const bannerTypes = [
    'Premium Display Banner',
    'Standard Marketing Banner',
    'Enterprise Brand Banner',
    'Promotional Banner',
    'Event Banner',
    'Custom Design Banner'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {banner ? 'Edit Banner Request' : 'Add New Banner Request'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Related Sale *
            </label>
            <select
              value={formData.saleId}
              onChange={(e) => handleSaleChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.saleId ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a sale</option>
              {mockSales.map(sale => (
                <option key={sale.id} value={sale.id}>
                  {sale.id} - {sale.customerName}
                </option>
              ))}
            </select>
            {errors.saleId && <p className="mt-1 text-sm text-red-600">{errors.saleId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.customerName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Customer or Organization Name"
              readOnly={!!formData.saleId}
            />
            {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Type *
            </label>
            <select
              value={formData.bannerType}
              onChange={(e) => handleInputChange('bannerType', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.bannerType ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select banner type</option>
              {bannerTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.bannerType && <p className="mt-1 text-sm text-red-600">{errors.bannerType}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="in-production">In Production</option>
                <option value="completed">Completed</option>
              </select>
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
              {banner ? 'Update Request' : 'Create Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModal;