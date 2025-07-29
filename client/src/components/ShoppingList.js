import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    static propTypes = {
      getItems: PropTypes.func.isRequired,
      deleteItem: PropTypes.func.isRequired,
      updateItem: PropTypes.func.isRequired,
      item: PropTypes.object.isRequired,
      isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
      this.props.getItems();
    }
    
    onDeleteClick = (id) => {
      this.props.deleteItem(id);
    }

    // New method for toggling item completion status
    onToggleComplete = (id, currentStatus) => {
      // Dispatch the updateItem action
      this.props.updateItem(id, { completed: !currentStatus });
  };

    // And in mapStateToProps/connect:
    // export default connect(mapStateToProps, { getItems, deleteItem, updateItem })(ShoppingList);

    render() {
        const { items } = this.props.item;
        return (
          <Container>
              <ListGroup>
                  <TransitionGroup className="shopping-list">
                      {items.map(({ _id, name, completed = false }) => ( // Add 'completed = false' as a default
                          <CSSTransition key={_id} timeout={500} classNames="fade">
                              <ListGroupItem className={completed ? 'completed-item' : ''}>
                                  <div className="d-flex align-items-center flex-grow-1"> {/* Flex container for checkbox and name */}
                                      <Input
                                          type="checkbox"
                                          className="item-checkbox"
                                          checked={completed}
                                          onChange={() => this.onToggleComplete(_id, completed)} // Handle toggle
                                      />
                                      <span className="item-name">{name}</span> {/* Wrap name in a span */}
                                  </div>
                                  {this.props.isAuthenticated ? (
                                      <Button
                                          className="remove-btn"
                                          color="danger"
                                          size="sm"
                                          onClick={this.onDeleteClick.bind(this, _id)}
                                      >
                                          &times;
                                      </Button>
                                  ) : null}
                              </ListGroupItem>
                          </CSSTransition>
                      ))}
                  </TransitionGroup>
              </ListGroup>
          </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem, updateItem })(ShoppingList);