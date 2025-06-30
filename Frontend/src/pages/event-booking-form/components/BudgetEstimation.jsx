import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BudgetEstimation = ({ formData, updateFormData, errors }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  const budgetRanges = [
    { min: 1000, max: 2500, label: '$1,000 - $2,500', description: 'Basic package', icon: 'DollarSign' },
    { min: 2500, max: 5000, label: '$2,500 - $5,000', description: 'Standard package', icon: 'DollarSign' },
    { min: 5000, max: 10000, label: '$5,000 - $10,000', description: 'Premium package', icon: 'DollarSign' },
    { min: 10000, max: 25000, label: '$10,000 - $25,000', description: 'Luxury package', icon: 'DollarSign' },
    { min: 25000, max: 50000, label: '$25,000 - $50,000', description: 'Ultra-luxury package', icon: 'DollarSign' },
    { min: 50000, max: 100000, label: '$50,000+', description: 'Exclusive experience', icon: 'DollarSign' }
  ];

  const budgetCategories = [
    { name: 'Venue', percentage: 40, icon: 'MapPin', description: 'Location rental and setup' },
    { name: 'Catering', percentage: 35, icon: 'Utensils', description: 'Food and beverages' },
    { name: 'Entertainment', percentage: 10, icon: 'Music', description: 'DJ, band, or performers' },
    { name: 'Decorations', percentage: 8, icon: 'Sparkles', description: 'Flowers, lighting, decor' },
    { name: 'Photography', percentage: 5, icon: 'Camera', description: 'Professional photography' },
    { name: 'Miscellaneous', percentage: 2, icon: 'MoreHorizontal', description: 'Other expenses' }
  ];

  const handleBudgetChange = (value) => {
    updateFormData('budget', parseInt(value));
  };

  const handleRangeSelect = (range) => {
    const midPoint = Math.floor((range.min + range.max) / 2);
    updateFormData('budget', midPoint);
  };

  const getSelectedRange = () => {
    return budgetRanges.find(range => 
      formData.budget >= range.min && (range.max === 100000 ? formData.budget >= range.min : formData.budget <= range.max)
    );
  };

  const getBudgetBreakdown = () => {
    return budgetCategories.map(category => ({
      ...category,
      amount: Math.round((formData.budget * category.percentage) / 100)
    }));
  };

  const getPackageRecommendation = () => {
    if (formData.budget < 2500) return 'Basic';
    if (formData.budget < 5000) return 'Standard';
    if (formData.budget < 10000) return 'Premium';
    if (formData.budget < 25000) return 'Luxury';
    return 'Ultra-Luxury';
  };

  const getBudgetTips = () => {
    const perGuest = Math.round(formData.budget / formData.guestCount);
    
    if (perGuest < 50) {
      return {
        level: 'Budget-Friendly',
        tips: [
          'Consider buffet-style catering',
          'Look for off-peak dates and times',
          'DIY decorations can save costs',
          'Digital invitations instead of printed'
        ],
        color: 'text-blue-600'
      };
    } else if (perGuest < 100) {
      return {
        level: 'Moderate',
        tips: [
          'Mix of plated and buffet options',
          'Professional DJ instead of live band',
          'Seasonal flowers for decorations',
          'Basic photography package'
        ],
        color: 'text-green-600'
      };
    } else {
      return {
        level: 'Premium',
        tips: [
          'Full-service plated dinner',
          'Live entertainment options',
          'Professional floral arrangements',
          'Comprehensive photography/videography'
        ],
        color: 'text-purple-600'
      };
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">
          What's your budget range?
        </h3>
        <p className="text-text-secondary">
          This helps us recommend packages that fit your needs and preferences
        </p>
      </div>

      {/* Quick Budget Range Selection */}
      <div className="space-y-4">
        <h4 className="font-heading text-lg font-semibold text-text-primary">
          Budget Ranges
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgetRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handleRangeSelect(range)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
                getSelectedRange() === range
                  ? 'border-primary bg-primary-50 shadow-primary'
                  : 'border-border bg-surface hover:border-primary-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  getSelectedRange() === range ? 'bg-primary text-white' : 'bg-primary-100 text-primary'
                }`}>
                  <Icon name={range.icon} size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{range.label}</p>
                  <p className="text-sm text-text-secondary">{range.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Budget Input */}
      <div className="space-y-6">
        <h4 className="font-heading text-lg font-semibold text-text-primary">
          Custom Budget
        </h4>
        
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="space-y-6">
            {/* Budget Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Total Budget
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => formData.budget > 1000 && handleBudgetChange(formData.budget - 100)}
                    className="w-8 h-8 rounded-full bg-primary-100 text-primary flex items-center justify-center hover:bg-primary-200 transition-colors duration-200"
                  >
                    <Icon name="Minus" size={16} strokeWidth={2} />
                  </button>
                  
                  <div className="text-center min-w-[120px]">
                    <span className="text-2xl font-bold text-primary">
                      ${formData.budget.toLocaleString()}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => formData.budget < 100000 && handleBudgetChange(formData.budget + 100)}
                    className="w-8 h-8 rounded-full bg-primary-100 text-primary flex items-center justify-center hover:bg-primary-200 transition-colors duration-200"
                  >
                    <Icon name="Plus" size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="100"
                  value={formData.budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((formData.budget - 1000) / 99000) * 100}%, var(--color-primary-100) ${((formData.budget - 1000) / 99000) * 100}%, var(--color-primary-100) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-text-secondary mt-2">
                  <span>$1K</span>
                  <span>$25K</span>
                  <span>$50K</span>
                  <span>$75K</span>
                  <span>$100K+</span>
                </div>
              </div>
            </div>

            {/* Direct Input */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-text-primary whitespace-nowrap">
                Or enter exact amount:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">$</span>
                <input
                  type="number"
                  min="1000"
                  max="100000"
                  step="100"
                  value={formData.budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  className="input-field pl-8 w-32"
                />
              </div>
            </div>

            {/* Per Guest Cost */}
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">Cost per guest:</span>
                <span className="text-lg font-bold text-primary">
                  ${Math.round(formData.budget / formData.guestCount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {errors.budget && (
          <p className="text-error text-sm">{errors.budget}</p>
        )}
      </div>

      {/* Package Recommendation */}
      <div className="bg-accent-50 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading text-lg font-semibold text-accent-800">
            Recommended Package: {getPackageRecommendation()}
          </h4>
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center space-x-2 text-accent-600 hover:text-accent-800 transition-colors duration-200"
          >
            <span className="text-sm font-medium">View Breakdown</span>
            <Icon 
              name={showBreakdown ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              strokeWidth={2} 
            />
          </button>
        </div>

        {showBreakdown && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getBudgetBreakdown().map((category, index) => (
                <div key={index} className="bg-surface p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name={category.icon} size={16} className="text-accent-600" strokeWidth={2} />
                      <span className="font-medium text-text-primary">{category.name}</span>
                    </div>
                    <span className="font-bold text-accent-600">
                      ${category.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">{category.description}</span>
                    <span className="text-accent-600">{category.percentage}%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Budget Tips */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary mt-1" strokeWidth={2} />
          <div>
            <h4 className="font-medium text-text-primary mb-2">
              <span className={getBudgetTips().color}>{getBudgetTips().level}</span> Budget Tips
            </h4>
            <ul className="text-sm text-text-secondary space-y-1">
              {getBudgetTips().tips.map((tip, index) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Budget Comparison */}
      <div className="bg-primary-50 p-6 rounded-xl">
        <h4 className="font-heading text-lg font-semibold text-primary mb-4">
          How Your Budget Compares
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="TrendingDown" size={20} strokeWidth={2} />
            </div>
            <p className="font-medium text-text-primary">Budget-Friendly</p>
            <p className="text-sm text-text-secondary">$30-60 per guest</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Minus" size={20} strokeWidth={2} />
            </div>
            <p className="font-medium text-text-primary">Standard</p>
            <p className="text-sm text-text-secondary">$60-120 per guest</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="TrendingUp" size={20} strokeWidth={2} />
            </div>
            <p className="font-medium text-text-primary">Premium</p>
            <p className="text-sm text-text-secondary">$120+ per guest</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetEstimation;