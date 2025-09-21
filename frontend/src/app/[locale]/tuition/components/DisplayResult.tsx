"use client";

interface DisplayResultProps {
  history: { date: string; description: string }[];
}

export default function DisplayResult({ history }: DisplayResultProps) {
  return (
    <div className="space-y-6">
      <div className="p-6 shadow-lg bg-white rounded text-center">
        <h2 className="text-2xl font-bold text-green-600">
          Thanh toán thành công!
        </h2>
        <p className="text-gray-600">Cảm ơn bạn đã hoàn thành giao dịch.</p>
      </div>

      <div className="p-4 rounded shadow bg-white">
        <h2 className="font-semibold mb-4">Lịch sử giao dịch</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Ngày giao dịch</th>
              <th className="p-2 text-left">Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="p-2">{item.date}</td>
                <td className="p-2">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
