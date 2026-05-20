'use client';
import { useRouter } from 'next/navigation';
import DatasetEditorForm from '@/components/DatasetEditorForm';

export default function AddDatasetPage() {
  const router = useRouter();

  return (
    <DatasetEditorForm
      submitUrl="/api/data"
      submitMethod="POST"
      onCancel={() => router.push('/')}
      onSuccess={() => router.push('/')}
    />
  );
}
