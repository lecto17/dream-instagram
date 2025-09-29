import ModalContainer from './ModalContainer';
import ModalPortal from '../portal/ModalPortal';
import { useState } from 'react';

type CheckPasswordModalProps = {
  onClose: () => void;
  onConfirm: (password: string) => void;
  channelName?: string;
};

const CheckPasswordModal = ({
  onClose,
  onConfirm,
  channelName,
}: CheckPasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    try {
      await onConfirm(password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalPortal>
      <ModalContainer onClose={onClose}>
        <div className="w-full max-w-md mx-auto bg-white rounded-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              채널 비밀번호 확인
            </h2>
            {channelName && (
              <p className="text-gray-600">
                <span className="font-medium">{`"${channelName}"`}</span> 채널에
                참여하려면 비밀번호를 입력하세요.
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!password.trim() || isLoading}
                className="flex-1 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '확인 중...' : '확인'}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default CheckPasswordModal;
