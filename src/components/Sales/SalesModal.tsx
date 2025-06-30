import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Sale } from '../../types';

interface SalesModalProps {
  sale: Sale | null;
  onSave: (saleData: Partial<Sale>) => void;
  onClose: () => void;
}

const SalesModal: React.FC<SalesModalProps> = ({ sale, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    productType: '',
    quantity: 1,
    totalAmount: 0,
    status: 'pending' as const
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (sale) {
      setFormData({
        customerName: sale.customerName,
        customerEmail: sale.customerEmail,
        productType: sale.productType,
        quantity: sale.quantity,
        totalAmount: sale.totalAmount,
        status: sale.status
      });
    }
  }, [sale]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName) newErrors.customerName = 'Customer name is required';
    if (!formData.customerEmail) newErrors.customerEmail = 'Customer email is required';
    if (!formData.productType) newErrors.productType = 'Product type is required';
    if (formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (formData.totalAmount <= 0) newErrors.totalAmount = 'Total amount must be greater than 0';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.customerEmail && !emailRegex.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email address';
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

  const productTypes = [
    'Premium Beacon Package',
    'Standard Beacon Kit',
    'Enterprise Beacon System',
    'Compact Beacon Set',
    'Industrial Beacon Solution'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {sale ? 'Edit Sale' : 'Add New Sale'}
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
                Customer Name *
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.customerName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Company or Organization Name"
              />
              {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Email *
              </label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.customerEmail ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="contact@company.com"
              />
              {errors.customerEmail && <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Type *
            </label>
            <select
              value={formData.productType}
              onChange={(e) => handleInputChange('productType', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.productType ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a product type</option>
              {productTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.productType && <p className="mt-1 text-sm text-red-600">{errors.productType}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.quantity ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="1"
              />
              {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Amount ($) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.totalAmount}
                onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.totalAmount ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.totalAmount && <p className="mt-1 text-sm text-red-600">{errors.totalAmount}</p>}
            </div>
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
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
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
              {sale ? 'Update Sale' : 'Create Sale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesModal;