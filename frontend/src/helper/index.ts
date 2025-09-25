/* eslint-disable @typescript-eslint/no-explicit-any */
// Thêm function ngoài component
export const findCurrentTuition = (data: any[]) => {
  const now = new Date();
  return data.find((item) => {
    const start = new Date(item.startTime);
    const end = new Date(item.endTime);
    return now >= start && now <= end;
  });
};
