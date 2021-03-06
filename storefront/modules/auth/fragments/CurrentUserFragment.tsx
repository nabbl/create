import { gql } from '@apollo/client';

import AddressFragment from './AddressFragment';
import ProductFragment from '../../products/fragments/ProductFragment';

const CurrentUserFragment = gql`
  fragment CurrentUserFragment on User {
    _id
    username
    isGuest
    name
    emails {
      address
      verified
    }
    orders {
      _id
    }
    isInitialPassword
    lastLogin {
      timestamp
      countryCode
      locale
    }

    profile {
      displayName
      phoneMobile
      address {
        ...AddressFragment
        addressLine
        countryCode
        regionCode
      }
    }
    cart {
      _id
      billingAddress {
        ...AddressFragment
      }

      contact {
        telNumber
        emailAddress
      }
      items {
        _id
        quantity
        total {
          amount
          currency
        }
        product {
          ...ProductFragment
        }
      }
      paymentInfo: payment {
        _id
        status
        provider {
          _id
          type
        }
        ... on OrderPaymentGeneric {
          sign
        }
      }
      taxes: total(category: TAXES) {
        amount
        currency
      }
      delivery: total(category: DELIVERY) {
        amount
        currency
      }
      payment: total(category: PAYMENT) {
        amount
        currency
      }
      deliveryInfo: delivery {
        _id
        meta
        ... on OrderDeliveryShipping {
          address {
            ...AddressFragment
          }
        }
      }
      total {
        amount
        currency
      }
      supportedPaymentProviders {
        _id
        type
      }
      supportedDeliveryProviders {
        _id
        type
      }
    }
  }
  ${ProductFragment}
  ${AddressFragment}
`;

export default CurrentUserFragment;
