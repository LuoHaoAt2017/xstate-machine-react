import { Modal } from "antd";

export default function LockModal({ visible, onClose, onUnlock }) {
  return (
    <Modal
      open={visible}
      closable={false}
      cancelText="登出"
      okText="解锁"
      onCancel={onClose}
      onOk={onUnlock}
    ></Modal>
  );
}
