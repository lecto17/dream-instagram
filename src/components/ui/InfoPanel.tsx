export default function InfoPanel() {
  return (
    <article className="w-full py-4 px-4 border-gray-200">
      <div className="max-w-[850px] mx-auto text-center">
        <p className="text-sm text-gray-600 italic">
          모든 저작권은 hnoo에게 있으며, 서비스 사용에 있어 모든 애로 및
          건의사항들은{' '}
          <a
            href="mailto:hnookim8201@gmail.com"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            hnookim8201@gmail.com
          </a>
          로 문의 부탁드립니다.
        </p>
      </div>
    </article>
  );
}
