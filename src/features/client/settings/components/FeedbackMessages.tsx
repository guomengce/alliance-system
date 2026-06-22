import { AnimatePresence } from 'motion/react';
import AlertBanner from '../../../../shared/components/AlertBanner';
import type { FeedbackMessagesProps } from '../types';

export default function FeedbackMessages({
  successMsg,
  errorMsg,
  setSuccessMsg,
  setErrorMsg
}: FeedbackMessagesProps) {
  return (
    <AnimatePresence>
      {successMsg && (
        <div className="mb-2">
          <AlertBanner message={successMsg} type="success" onClose={() => setSuccessMsg('')} />
        </div>
      )}
      {errorMsg && (
        <div className="mb-2">
          <AlertBanner message={errorMsg} type="error" onClose={() => setErrorMsg('')} />
        </div>
      )}
    </AnimatePresence>
  );
}
