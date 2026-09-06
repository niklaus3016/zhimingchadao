import React from 'react';
import { PrivacyPolicyContent } from '../consent/LegalContent';
import { LegalDocModal } from '../consent/LegalDocModal';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

/**
 * 「我的-隐私政策」入口弹窗，与启动同意弹窗中点击《隐私政策》的全文弹窗
 * 共用同一外壳（LegalDocModal）与内容（PrivacyPolicyContent），保证完全一致。
 */
export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => (
  <LegalDocModal title="隐私政策" onClose={onClose}>
    <PrivacyPolicyContent />
  </LegalDocModal>
);
