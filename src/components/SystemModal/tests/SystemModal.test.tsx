import { render, fireEvent, screen } from '@testing-library/react';
import SystemModal from '../SystemModal';

describe('SystemModal', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  it('시스템 모달 랜더링 - 성공', () => {
    const { asFragment } = render(
      <SystemModal visible={true} onClose={onClose}>
        시스템 모달
      </SystemModal>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('시스템 모달 랜더링 - 실패', () => {
    expect(() => render(<SystemModal.Header title='헤더' />)).toThrowError('SystemModal Context Error');
  });

  it('시스템 모달 랜더링 - visible: false', () => {
    const { asFragment } = render(
      <SystemModal visible={false} onClose={onClose}>
        시스템 모달
      </SystemModal>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('시스템 모달 랜더링 - header (닫기 아이콘 o)', () => {
    const { asFragment } = render(
      <SystemModal visible={true} onClose={onClose}>
        <SystemModal.Header title='헤더' />
      </SystemModal>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('시스템 모달 랜더링 - header (닫기 아이콘 x)', () => {
    const { asFragment } = render(
      <SystemModal visible={true} onClose={onClose}>
        <SystemModal.Header title='헤더' isCloseIcon={false} />
      </SystemModal>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('시스템 모달 랜더링 - content', () => {
    const { asFragment } = render(
      <SystemModal visible={true} onClose={onClose}>
        <SystemModal.Content>콘텐츠 영역</SystemModal.Content>
      </SystemModal>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('시스템 모달 랜더링 - footer', () => {
    it('타입: all', () => {
      const { asFragment } = render(
        <SystemModal visible={true} onClose={onClose}>
          <SystemModal.Footer
            type='all'
            confirmText='확인'
            cancelText='
          취소'
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </SystemModal>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('타입 없을 경우', () => {
      const { asFragment } = render(
        <SystemModal visible={true} onClose={onClose}>
          <SystemModal.Footer
            confirmText='확인'
            cancelText='
          취소'
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </SystemModal>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('타입: confirm', () => {
      const { asFragment } = render(
        <SystemModal visible={true} onClose={onClose}>
          <SystemModal.Footer type='confirm' confirmText='확인' onConfirm={onConfirm} />
        </SystemModal>
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('타입: cancel', () => {
      const { asFragment } = render(
        <SystemModal visible={true} onClose={onClose}>
          <SystemModal.Footer type='cancel' cancelText='취소' onCancel={onCancel} />
        </SystemModal>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('확인 버튼을 클릭하면 모달이 닫힌다.', () => {
    render(
      <SystemModal visible={true} onClose={onClose}>
        <SystemModal.Footer type='all' confirmText='확인' cancelText='취소' onConfirm={onConfirm} onCancel={onCancel} />
      </SystemModal>
    );

    fireEvent.click(screen.getByText('확인'));

    expect(onConfirm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('취소 버튼을 클릭하면 모달이 닫힌다.', () => {
    render(
      <SystemModal visible={true} onClose={onClose}>
        <SystemModal.Footer type='all' confirmText='확인' cancelText='취소' onConfirm={onConfirm} onCancel={onCancel} />
      </SystemModal>
    );

    fireEvent.click(screen.getByText('취소'));

    expect(onCancel).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
