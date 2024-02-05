'use client';

import { useState } from 'react';
import '../../extended-dayjs';
import { DatePickerInput } from '@mantine/dates';

const TODAY = new Date();

export default function DatePicker({
  id,
  date,
}: {
  id: string;
  date?: string;
}) {
  const dateValue = date ? new Date(date) : TODAY;
  const [value, setValue] = useState<Date | null>(dateValue);
  return (
    <DatePickerInput
      label="Watched on"
      id={id}
      name={id}
      placeholder={`${TODAY}`}
      value={value}
      onChange={setValue}
    />
  );
}
