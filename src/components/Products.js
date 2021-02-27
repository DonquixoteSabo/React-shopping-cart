import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux';

import formatCurrency from '../util';
import { fetchProducts } from './actions/productActions';

class Products extends Component {
  state = {
    product: null,
  };
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = product => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    const { product } = this.state;

    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className='products'>
              {this.props.products.map(product => (
                <li key={product._id}>
                  <div className='product'>
                    <a
                      href={'#' + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={product.image} alt={product.title} />
                      <p>{product.title}</p>
                    </a>
                    <div className='product-price'>
                      <div>{formatCurrency(product.price)}</div>
                      <button
                        className='button primary'
                        onClick={() => this.props.addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen>
            <Zoom>
              <button className='close-modal' onClick={this.closeModal}>
                X
              </button>
              <div className='product-details'>
                <img src={product.image} alt={product.title} />
                <div className='product-details-description'>
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Avaiable Sizes:{' '}
                    {product.availableSizes.map(size => (
                      <span>
                        {' '}
                        <button className='button'>{size}</button>
                      </span>
                    ))}
                  </p>
                  <div className='product-price'>
                    <div>
                      {formatCurrency(product.price)}
                      <button
                        className='button primary'
                        onClick={() => {
                          this.props.addToCart(product);
                          this.closeModal();
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(state => ({ products: state.products.items }), {
  fetchProducts,
})(Products);
