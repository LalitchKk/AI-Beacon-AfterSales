import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { LineOA } from '../../types';
import { mockAccounts } from '../../data/mockData';

interface LineOAModalProps {
  lineOA: LineOA | null;
  onSave: (lineOAData: Partial<LineOA>) => void;
  onClose: () => void;
}

const LineOAModal: React.FC<LineOAModalProps> = ({ lineOA, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    accountId: '',
    lineOfficialAccountName: '',
    lineBasicId: '',
    linePremiumId: '',
    lineProviderId: '',
    lineProviderName: '',
    lineChannelId: '',
    lineChannelSecret: '',
    status: 'pending' as const,
    notes: ''
  });
  const [showSecret, setShowSecret] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (lineOA) {
      setFormData({
        accountId: lineOA.accountId,
        lineOfficialAccountName: lineOA.lineOfficialAccountName,
        lineBasicId: lineOA.lineBasicId,
        linePremiumId: lineOA.linePremiumId || '',
        lineProviderId: lineOA.lineProviderId,
        lineProviderName: lineOA.lineProviderName,
        lineChannelId: lineOA.lineChannelId,
        lineChannelSecret: lineOA.lineChannelSecret,
        status: lineOA.status,
        notes: lineOA.notes || ''
      });
    }
  }, [lineOA]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.accountId) newErrors.accountId = 'Account is required';
    if (!formData.lineOfficialAccountName) newErrors.lineOfficialAccountName = 'LINE Official Account Name is required';
    if (!formData.lineBasicId) newErrors.lineBasicId = 'LINE Basic ID is required';
    if (!formData.lineProviderId) newErrors.lineProviderId = 'LINE Provider ID is required';
    if (!formData.lineProviderName) newErrors.lineProviderName = 'LINE Provider Name is required';
    if (!formData.lineChannelId) newErrors.lineChannelId = 'LINE Channel ID is required';
    if (!formData.lineChannelSecret) newErrors.lineChannelSecret = 'LINE Channel Secret is required';

    // Validate LINE Basic ID format
    if (formData.lineBasicId && !formData.lineBasicId.startsWith('@')) {
      newErrors.lineBasicId = 'LINE Basic ID must start with @';
    }

    // Validate Channel ID (should be numeric)
    if (formData.lineChannelId && !/^\d+$/.test(formData.lineChannelId)) {
      newErrors.lineChannelId = 'Channel ID must be numeric';
    }

    // Validate Channel Secret length
    if (formData.lineChannelSecret && formData.lineChannelSecret.length < 32) {
      newErrors.lineChannelSecret = 'Channel Secret must be at least 32 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedAccount = mockAccounts.find(acc => acc.id === formData.accountId);
      onSave({
        ...formData,
        accountName: selectedAccount?.companyName || ''
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
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
            {lineOA ? 'Edit LINE OA' : 'Add New LINE OA'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Account Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Linked Account *
            </label>
            <select
              value={formData.accountId}
              onChange={(e) => handleInputChange('accountId', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.accountId ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select an account</option>
              {mockAccounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.companyName}
                </option>
              ))}
            </select>
            {errors.accountId && <p className="mt-1 text-sm text-red-600">{errors.accountId}</p>}
          </div>

          {/* LINE Official Account Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LINE Official Account Name *
              </label>
              <input
                type="text"
                value={formData.lineOfficialAccountName}
                onChange={(e) => handleInputChange('lineOfficialAccountName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.lineOfficialAccountName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., TechCorp Official"
              />
              {errors.lineOfficialAccountName && <p className="mt-1 text-sm text-red-600">{errors.lineOfficialAccountName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* LINE IDs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LINE Basic ID *
              </label>
              <input
                type="text"
                value={formData.lineBasicId}
                onChange={(e) => handleInputChange('lineBasicId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.lineBasicId ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="@your-line-id"
              />
              {errors.lineBasicId && <p className="mt-1 text-sm text-red-600">{errors.lineBasicId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LINE Premium ID
              </label>
              <input
                type="text"
                value={formData.linePremiumId}
                onChange={(e) => handleInputChange('linePremiumId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="@your-premium-id (optional)"
              />
            </div>
          </div>

          {/* Provider Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LINE Provider ID *
              </label>
              <input
                type="text"
                value={formData.lineProviderId}
                onChange={(e) => handleInputChange('lineProviderId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.lineProviderId ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="PROV001"
              />
              {errors.lineProviderId && <p className="mt-1 text-sm text-red-600">{errors.lineProviderId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LINE Provider Name *
              </label>
              <input
                type="text"
                value={formData.lineProviderName}
                onChange={(e) => handleInputChange('lineProviderName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.lineProviderName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Your Provider Name"
              />
              {errors.lineProviderName && <p className="mt-1 text-sm text-red-600">{errors.lineProviderName}</p>}
            </div>
          </div>

          {/* Channel Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LINE Channel ID *
              </label>
              <input
                type="text"
                value={formData.lineChannelId}
                onChange={(e) => handleInputChange('lineChannelId', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.lineChannelId ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="1234567890"
              />
              {errors.lineChannelId && <p className="mt-1 text-sm text-red-600">{errors.lineChannelId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LINE Channel Secret *
              </label>
              <div className="relative">
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={formData.lineChannelSecret}
                  onChange={(e) => handleInputChange('lineChannelSecret', e.target.value)}
                  className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.lineChannelSecret ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Channel Secret Key"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.lineChannelSecret && <p className="mt-1 text-sm text-red-600">{errors.lineChannelSecret}</p>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Additional notes or comments..."
            />
          </div>

          {/* Form Actions */}
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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {lineOA ? 'Update LINE OA' : 'Create LINE OA'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LineOAModal;