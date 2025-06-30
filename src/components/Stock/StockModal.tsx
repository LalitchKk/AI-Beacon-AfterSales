import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Stock } from '../../types';

interface StockModalProps {
  stock: Stock | null;
  onSave: (stockData: Partial<Stock>) => void;
  onClose: () => void;
}

const StockModal: React.FC<StockModalProps> = ({ stock, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    currentQuantity: 0,
    minimumQuantity: 0
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (stock) {
      setFormData({
        productName: stock.productName,
        category: stock.category,
        currentQuantity: stock.currentQuantity,
        minimumQuantity: stock.minimumQuantity
      });
    }
  }, [stock]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.productName) newErrors.productName = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.currentQuantity < 0) newErrors.currentQuantity = 'Current quantity cannot be negative';
    if (formData.minimumQuantity < 0) newErrors.minimumQuantity = 'Minimum quantity cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const status = formData.currentQuantity === 0 ? 'out-of-stock' :
                    formData.currentQuantity <= formData.minimumQuantity ? 'low-stock' : 'in-stock';
      
      onSave({
        ...formData,
        status
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const categories = [
    'Premium Beacons',
    'Standard Beacons',
    'Compact Beacons',
    'Industrial Beacons',
    'Accessories',
    'Software Licenses'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {stock ? 'Edit Stock Item' : 'Add New Stock Item'}
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
              Product Name *
            </label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => handleInputChange('productName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.productName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Beacon Pro X1"
            />
            {errors.productName && <p className="mt-1 text-sm text-red-600">{errors.productName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Quantity *
              </label>
              <input
                type="number"
                min="0"
                value={formData.currentQuantity}
                onChange={(e) => handleInputChange('currentQuantity', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.currentQuantity ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.currentQuantity && <p className="mt-1 text-sm text-red-600">{errors.currentQuantity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Quantity *
              </label>
              <input
                type="number"
                min="0"
                value={formData.minimumQuantity}
                onChange={(e) => handleInputChange('minimumQuantity', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.minimumQuantity ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.minimumQuantity && <p className="mt-1 text-sm text-red-600">{errors.minimumQuantity}</p>}
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
              {stock ? 'Update Stock' : 'Add Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;