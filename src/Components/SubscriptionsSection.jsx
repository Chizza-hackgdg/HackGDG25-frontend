import React from 'react';
import '../styles/SubscriptionsSection.css';

const subscriptionPlans = [
  {
    name: 'Standard Plan',
    price: '$10/month',
    features: [
      'Access to all core learning modules',
      'Community forum access',
      'Basic AI chat assistance',
      '1 Free milestone reroll per week',
      'Standard support'
    ],
    borderColor: '#DA70D6',
    buttonClass: 'btn-standard',
  },
  {
    name: 'Elite Plan',
    price: '$20/month',
    features: [
      'All Standard features',
      'Advanced AI planning & insights',
      'Priority in partner matching threads',
      '5 Free milestone rerolls per week',
      'Option to purchase additional rerolls',
      'Priority support'
    ],
    borderColor: '#FF4500',
    buttonClass: 'btn-elite',
    isPopular: true,
  },
  {
    name: 'Premium Plan',
    price: '$40/month',
    features: [
      'All Elite features',
      'Direct AI mentorship sessions (limited)',
      'Exclusive content & early access to new features',
      '10 Free milestone rerolls per week',
      'Discount on purchased rerolls',
      'Dedicated premium support'
    ],
    borderColor: '#FFD700',
    buttonClass: 'btn-premium',
  },
];

const SubscriptionsSection = () => {
  const handleContinue = (planName) => {
    alert(`Proceeding with ${planName}! (Integration with payment gateway needed)`);
  };

  return (
    <section id="subscriptions" className="subscriptions-section">
      <div className="subscriptions-header">
        <h2 className="subscriptions-title">
           SUBSCRIPTIONS
        </h2>
      </div>
      <div className="subscription-cards-container">
        {subscriptionPlans.map((plan, index) => (
          <div
            key={index}
            className="subscription-card"
            style={{ '--border-color': plan.borderColor }}
          >
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-price">{plan.price}</p>
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature.startsWith('- ') ? feature.substring(2) : feature}</li>
              ))}
            </ul>
            <button className={`btn-continue ${plan.buttonClass}`} onClick={() => handleContinue(plan.name)}>Continue</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionsSection;