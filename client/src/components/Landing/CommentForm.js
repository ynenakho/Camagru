import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field, reset } from 'redux-form';

import * as mainActions from '../../actions/mainActions';

export class CommentForm extends Component {
  onSubmit = formValues => {
    const { picture, addComment } = this.props;
    addComment(picture._id, formValues);
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <div>
            <Field
              name="text"
              component="textarea"
              className="white-text"
              style={{ padding: '10px' }}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={pristine || submitting}
          className="btn blue"
        >
          Send
        </button>
      </form>
    );
  }
}

const afterSubmit = (result, dispatch) => dispatch(reset('commentForm'));

export default compose(
  connect(
    null,
    mainActions
  ),
  reduxForm({ form: 'commentForm', onSubmitSuccess: afterSubmit })
)(CommentForm);
