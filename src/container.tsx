import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  DraggablesContext,
  DraggableContext,
} from './types';
import {Draggable} from '@shopify/draggable';

export interface DraggableContainerProps {
  draggableID?: string,
}

export class DraggableContainer extends React.Component<DraggableContainerProps, never> {
  static contextTypes = {
    draggables: PropTypes.any,
  };
  static childContextTypes = {
    draggable: PropTypes.any,
    draggableClass: PropTypes.any,
  };

  context: DraggablesContext;
  elem: HTMLElement;

  componentDidMount() {
    const context = this.draggableContext;
    context.draggable = new Draggable(this.elem, {
      draggable: `.${context.draggableClass}`,
    });
  }

  componentWillUnmount() {
    this.draggable.destroy();
  }

  get draggable() {
    return this.draggableContext.draggable;
  }

  get draggableContext() {
    const {draggables} = this.context;
    const {draggableID = 'default'} = this.props
    let draggable = draggables[draggableID];
    if (draggable == null) {
      draggable = new DraggableContext();
      draggables[draggableID] = draggable;
    }
    return draggable;
  }

  getChildContext(): DraggableContext {
    return this.draggableContext;
  }

  render() {
    return (
      <div ref={(el) => this.elem = el}>
        {this.props.children}
      </div>
    );
  }
};