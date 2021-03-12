import { PictureType } from 'actions/types';
import { ComponentType, FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { reduxForm, Field, reset, InjectedFormProps } from 'redux-form';
import * as mainActions from '../../actions/mainActions';

type Props = ConnectedProps<typeof connector> &
  InjectedFormProps & { picture: PictureType };

type FormValuesType = {
  text: string;
};

const CommentForm: FC<Props> = ({
  handleSubmit,
  pristine,
  submitting,
  picture,
  addComment,
}) => {
  const onSubmit: any = (formValues: FormValuesType) => {
    addComment(picture._id, formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
};

const afterSubmit = (result: any, dispatch: Dispatch) =>
  dispatch(reset('commentForm'));

const connector = connect(null, mainActions);

export default compose<Props>(
  connector,
  reduxForm({ form: 'commentForm', onSubmitSuccess: afterSubmit })
)(CommentForm);
