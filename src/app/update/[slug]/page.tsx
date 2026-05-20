'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { Dataset } from '@/types/data';
import DatasetEditorForm from '@/components/DatasetEditorForm';

export default function UpdateDatasetPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!params.slug) return;

    setDataset(null);
    setError('');

    fetch(`/api/data?name=${params.slug}`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Dataset not found.');
        }

        return response.json();
      })
      .then((data: Dataset) => {
        setDataset(data);
        setError('');
      })
      .catch(() => {
        setDataset(null);
        setError('Dataset not found.');
      });
  }, [params.slug]);

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
        <Typography color="error">Dataset not found.</Typography>
      </Box>
    );
  }

  if (!dataset) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <DatasetEditorForm
      submitUrl={`/api/data?slug=${params.slug}`}
      submitMethod="PUT"
      initialTitle={dataset.title}
      initialDescription={dataset.description ?? ''}
      initialItems={dataset.items.map((item) => item.name)}
      onCancel={() => router.push('/')}
      onSuccess={(slug) => router.push(`/puzzle/${slug}`)}
    />
  );
}