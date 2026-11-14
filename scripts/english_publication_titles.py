"""Add English display titles while preserving original citation metadata."""
from pathlib import Path
import json

TITLES = {
    'Chương trình tọ ađàm Dự thả o quy hoạ chđiệ n 8- Open or Close for Green Energy Transition, GreenID Host: 16 September 2021': 'Draft Power Development Plan VIII Roundtable: Open or Closed to the Green Energy Transition, GreenID, September 16, 2021',
    'Cyber Security in Inverter-based Smart Power System and Microgrid with high penetration of the Renewable Energy/ Vấ nđề bả o mậ t thông tin trong lư ớ iđiệ n có tỷ trọ ng cao các nguồ n NLTT': 'Cybersecurity in Inverter-Based Smart Power Systems and Microgrids with High Renewable Energy Penetration',
    'Các yêu cầ u cầ nđápứ ng về hạ tầ ng kỹ thuậ t cho các giả i pháp linh hoạ t cho hệ thố ngđiệ n': 'Technical Infrastructure Requirements for Power System Flexibility Solutions',
    'Kinh nghiệ m quố c tế về 100% Năng lư ợ ng tái tạ o và bố i cả nh tạ i Việ t Nam': 'International Experience with 100% Renewable Energy and the Vietnamese Context',
    'ĐIỀU KHIỂN CÔNG SUẤT PHẢN KHÁNG BẰNG INVERTER BA PHA CHO HỆ THỐNG NGUỒN ĐIỆN MẶT TRỜI HÒA LƯỚI': 'Reactive Power Control Using a Three-Phase Inverter for Grid-Connected Photovoltaic Systems',
    'ĐẶC TÍNH ĐIỆN ĐẦU RA CỦA MỘT DÀN PIN MẶT TRỜI DƯỚI CÁC ĐIỀU KIỆN KHÔNG ĐỒNG NHẤT': 'Electrical Output Characteristics of a Photovoltaic Array under Nonuniform Conditions',
    'DỰ BÁO BỨC XẠ MẶT TRỜI SỬ DỤNG MẠNG NƠ-RON NHÂN TẠO THÔNG QUA ĐÁNH GIÁ SAI SỐ BÌNH PHƯƠNG TRUNG BÌNH': 'Solar Irradiance Forecasting Using Artificial Neural Networks and Mean Squared Error Evaluation',
    'Tuabin gió không khí ở độ cao lớn': 'High-Altitude Airborne Wind Turbines',
    '「小型風車による水素ガス自給製造」': 'Self-Sufficient Hydrogen Production Using Small Wind Turbines',
    '「実運用下の小形風車の発電出力変動計測」': 'Measurement of Small Wind Turbine Power Output Fluctuations under Real Operating Conditions',
    'ィーゼル発電機を用いたマイクログリッドの自立分散制御': 'Autonomous Distributed Control of a Microgrid Using Diesel Generators',
}
VENUES = {
    'Trường Đại học Công nghiệp Hà Nội': 'Hanoi University of Industry',
    'Đại học Công nghiệp Hà Nội': 'Hanoi University of Industry',
    'Các giả i phápđả m bả o tính linh hoạ t và ổ nđị nh củ a hệ thố ngđiệ n, GreenID Host: 27 Aug 2021': 'Solutions for Power System Flexibility and Stability, GreenID, August 27, 2021',
    'Thúcđẩ y mạ ng lư ớ i Doanh nghiệ p tiên phong hư ớ ng tớ i 100% Năng lư ợ ng tái tạ o, WWF, Nov 9 2021': 'Promoting a Network of Business Pioneers toward 100% Renewable Energy, WWF, November 9, 2021',
}
if __name__ == '__main__':
    path = Path(__file__).resolve().parents[1] / 'Frontend/assets/js/publications_data.js'
    source = path.read_text(encoding='utf-8')
    prefix, records = source.split('=', 1)
    records = json.loads(records.strip().rstrip(';'))
    for record in records:
        if record.get('title') in TITLES:
            record['englishTitle'] = TITLES[record['title']]
        if record.get('venue') in VENUES:
            record['englishVenue'] = VENUES[record['venue']]
    path.write_text(prefix + '= ' + json.dumps(records, ensure_ascii=False, indent=4) + ';\n', encoding='utf-8')
