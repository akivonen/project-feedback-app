import { useField } from 'formik';

type MessageInputProps = {
  name: string;
  isReplyForm: boolean;
} & Omit<React.ComponentProps<'textarea'>, 'name'>;

export default function MessageInput(props: MessageInputProps) {
  const { isReplyForm } = props;
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  const textareaStyles = isReplyForm ? 'flex-1' : 'mt-6';
  const textareaErrorStyles = hasError ? 'border-orange-200' : 'border-transparent';

  return (
    <>
      <label htmlFor="body" className="sr-only">
        {isReplyForm ? 'reply' : 'comment'}
      </label>
      <textarea
        {...field}
        {...props}
        id={props.name}
        className={`w-full rounded-md border bg-light-200 p-4 text-sm text-dark-400 outline-none placeholder:text-sm placeholder:text-light-600 focus:border-blue-300 md:text-[15px] ${textareaStyles} ${textareaErrorStyles}`}
        placeholder={`Type your ${isReplyForm ? 'reply' : 'comment'} here`}
        aria-label={`Type your ${isReplyForm ? 'reply' : 'comment'} here`}
        aria-describedby={hasError ? 'body-error' : undefined}
      />
      <div id="body-error" className="text-[14px] text-orange-200">
        {hasError}
      </div>
    </>
  );
}
