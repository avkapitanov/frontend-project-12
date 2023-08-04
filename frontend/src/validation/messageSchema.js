import * as Yup from 'yup';

const messageSchema = (t) => Yup.object().shape({
  message: Yup.string().required(t('chat.required')),
});

export default messageSchema;
