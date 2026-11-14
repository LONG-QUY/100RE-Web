"""Translate existing public-site interface copy without changing names or data keys."""
from pathlib import Path
import html

ROOT = Path(__file__).resolve().parents[1] / 'Frontend'
COPY = '''
Chỉnh Edit:|Edit:
Đã cắt và tối ưu hóa ảnh thẻ thành công!|Profile photo cropped and optimized.
Đang lưu...|Saving...
Update thành viên thành công!|Member updated.
Đã thêm thành viên mới thành công!|New member added.
Có lỗi xảy ra:|An error occurred:
Chuyển Sang Cựu Thành Viên (Alumni)|Move to Alumni
Bạn có chắc chắn muốn chuyển thành viên "${member.name}" sang danh sách Alumni (Cựu thành viên) của 100RE Lab không? Thông tin thành viên sẽ được lưu vĩnh viễn vào cơ sở dữ liệu.|Move "${member.name}" to the 100RE Lab alumni directory? Their information will be retained in the database.
Chuyển Sang Alumni|Move to Alumni
Đã chuyển thành viên "${member.name}" sang danh sách Alumni thành công!|Moved "${member.name}" to the alumni directory.
Confirm Deletion Thành Viên|Confirm Member Deletion
Bạn có chắc chắn muốn xóa thành viên "${member.name}" khỏi danh sách phòng Lab không?|Delete "${member.name}" from the lab directory?
Delete Thành Viên|Delete Member
Đã xóa thành viên "${member.name}".|Deleted member "${member.name}".
Ảnh ${idx + 1}|Photo ${idx + 1}
'''
COPY += '''
Phiên đăng nhập đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.|Your session has expired or is invalid. Please sign in again.
Máy chủ chưa xác nhận lưu dữ liệu. Vui lòng thử lại.|The server could not confirm your changes were saved. Please try again.
Đang lưu dữ liệu. Vui lòng đợi.|Saving your changes. Please wait.
Không tìm thấy mục cần sửa.|The item you want to edit could not be found.
Khám phá nghiên cứu|Explore Research
Thành viên của nhóm|Team Members
Hướng nghiên cứu của nhóm|Explore Team Research
Thành viên|Members
Đã sao chép trích dẫn APA vào clipboard!|APA citation copied to clipboard.
Trích dẫn đã được sao chép vào clipboard!|Citation copied to clipboard.
Đã lưu thay đổi trang chủ thành công!|Homepage changes saved.
Đã lưu thay đổi trang chủ.|Homepage changes saved.
Đã lưu thay đổi.|Changes saved.
Đăng Nhập Thành Viên|Member Sign In
Cổng thông tin &amp; không gian làm việc nghiên cứu phòng Lab|100RE Laboratory research portal
Tên đăng nhập hoặc Email|Username or Email
Nhập tên đăng nhập hoặc email|Enter your username or email
Nhập mật khẩu của bạn|Enter your password
Hiện/ẩn mật khẩu|Show or hide password
Mật khẩu|Password
Đăng Nhập Không Gian Lab|Sign In
Dành cho Ban Cố vấn, Nghiên cứu viên và Sinh viên 100RE Lab|For 100RE Lab advisors, researchers, and students
Đăng Nhập|Sign In
Đăng xuất (Logout)|Sign Out
Đã đăng xuất khỏi tài khoản.|You have signed out.
Đăng nhập thành công:|Signed in as
Sai tên đăng nhập hoặc mật khẩu!|Incorrect username or password.
Không thể kết nối với dịch vụ đăng nhập.|Unable to connect to the sign-in service. Please try again.
Mật khẩu mặc định:|Default password:
Không thể kiểm tra phiên đăng nhập:|Could not verify the session:
Tài khoản:|Account:
(Bấm để mở menu / Đăng xuất)|(Open account menu / Sign out)
Quản trị viên (Supervisor)|Administrator
Danh Sách Thành Viên|Member Directory
Chưa có thành viên trong nhóm này.|This team has no members yet.
Sửa thông tin thành viên|Edit member details
Chuyển thành viên sang mục Alumni|Move member to Alumni
Xóa thành viên|Delete member
Xác Nhận Xóa|Confirm Deletion
Bạn có chắc chắn muốn thực hiện hành động này không?|Are you sure you want to continue?
Xóa Vĩnh Viễn|Delete Permanently
Hủy Bỏ|Cancel
Hủy bỏ|Cancel
Ảnh Thư Viện|Gallery Photo
Đề Tài Nghiên Cứu|Research Project
Bài Báo / Tin Tức|News Article
Bài Báo Khoa Học|Publication
Cột Mốc Hành Trình|Journey Entry
Hướng Nghiên Cứu|Research Direction
Đối Tác Hợp Tác|Collaborator
Thiết Bị Phòng Lab|Lab Equipment
Khoản Tài Trợ|Funding Contribution
Hồ Sơ Cựu Thành Viên Tiêu Biểu|Featured Alumni Profile
Cựu Thành Viên Nhóm|Team Alumni
Bạn có chắc chắn muốn xóa vĩnh viễn ${itemName.toLowerCase()} này không? Thao tác này không thể hoàn tác.|Permanently delete this ${itemName.toLowerCase()}? This cannot be undone.
Đã xóa ${itemName.toLowerCase()} thành công!|The ${itemName.toLowerCase()} has been deleted.
Chỉnh sửa Banner Hero|Edit Hero Banner
Chỉnh sửa Số Liệu Thống Kê|Edit Statistics
Chỉnh sửa Mục Tiêu (Goals)|Edit Goals
Chỉnh sửa Giới Thiệu Nền Tảng|Edit Research Introduction
Chỉnh sửa nhóm|Edit team
Chỉnh sửa Thư Viện Ảnh|Edit Gallery
Chỉnh sửa Địa Chỉ & Bản Đồ|Edit Address & Map
Chỉnh sửa Thông Tin Liên Hệ & Footer|Edit Contact Details & Footer
Chỉnh sửa nội dung|Edit Content
Khôi phục mặc định mục này|Reset This Section
Khôi phục toàn bộ nội dung gốc của trang chủ|Restore the default homepage content
Khôi phục mặc định|Restore Defaults
Lưu thay đổi|Save Changes
Chỉnh sửa: Banner Hero Trang Chủ|Edit Homepage Hero
Tiêu đề Hero (Hỗ trợ HTML/thẻ span làm nổi bật)|Hero Title (HTML and span highlighting supported)
Mô tả / Tôn chỉ phòng Lab|Description / Lab Mission
Nút 1 - Nhãn|Button 1 - Label
Nút 1 - Đường dẫn (URL)|Button 1 - URL
Nút 2 - Nhãn|Button 2 - Label
Nút 2 - Đường dẫn (URL)|Button 2 - URL
Chỉnh sửa: Khối Số Liệu Thống Kê|Edit Statistics
Chỉ số 1 - Con số (VD: 200+)|Statistic 1 - Value (e.g. 200+)
Chỉ số 1 - Tên nhãn (VD: Publications)|Statistic 1 - Label (e.g. Publications)
Chỉ số 2 - Con số (VD: 40+)|Statistic 2 - Value (e.g. 40+)
Chỉ số 2 - Tên nhãn|Statistic 2 - Label
Chỉ số 3 - Con số (VD: 8)|Statistic 3 - Value (e.g. 8)
Chỉ số 3 - Tên nhãn|Statistic 3 - Label
Chỉ số 4 - Con số (VD: 10:1)|Statistic 4 - Value (e.g. 10:1)
Chỉ số 4 - Tên nhãn|Statistic 4 - Label
Chỉnh sửa: Mục Tiêu & Tầm Nhìn (Goals)|Edit Goals & Vision
Tiêu đề mục|Section Title
Đoạn văn 1|Paragraph 1
Đoạn văn 2|Paragraph 2
Đoạn văn 3 (Kết luận)|Paragraph 3 (Conclusion)
Tác giả trích dẫn (Author)|Quote Author
Ngày thành lập / ghi nhận|Established / Recorded Date
Chỉnh sửa: Giới Thiệu Nền Tảng Nghiên Cứu|Edit Research Introduction
Tiêu đề chính nền tảng|Research Platform Title
Đoạn mở đầu (Lead paragraph)|Lead Paragraph
Tiêu đề phụ 1 (Hạ tầng Lab)|Subheading 1 (Lab Infrastructure)
Nội dung phụ 1|Section 1 Content
Tiêu đề phụ 2 (8 Nhóm nghiên cứu)|Subheading 2 (8 Research Teams)
Nội dung phụ 2|Section 2 Content
Chỉnh sửa Nhóm:|Edit Team:
Tên nhóm nghiên cứu &amp; Tiêu đề hiển thị|Research Team &amp; Display Title
Hình ảnh minh họa nhóm (URL hoặc tải từ máy tính)|Team Image (URL or file upload)
hoặc link ảnh|or image URL
Chọn ảnh|Choose Image
Chú thích ảnh học thuật (Photo / Source Caption)|Photo Caption / Source
Đoạn văn chuyên môn 1 (Mục tiêu &amp; Lĩnh vực cốt lõi)|Research Paragraph 1 (Goals &amp; Core Areas)
Đoạn văn chuyên môn 2 (Ứng dụng thực tiễn &amp; Hợp tác)|Research Paragraph 2 (Applications &amp; Collaboration)
Chữ nút liên kết (Link Text)|Link Text
Đường dẫn liên kết (Link URL)|Link URL
Chỉnh sửa: Thư Viện Ảnh Nổi Bật|Edit Featured Gallery
Đường dẫn ảnh|Image URL
Chú thích ảnh|Photo Caption
Tiêu đề thư viện ảnh|Gallery Title
Nhãn nút xem thêm|View More Button Label
4 Ảnh hiển thị trên trang chủ:|4 Homepage Photos:
Chỉnh sửa: Địa Chỉ & Vị Trí Phòng Lab|Edit Lab Address & Location
Đơn vị / Trường Đại học|Institution / University
Phòng làm việc (Offices)|Offices
Địa chỉ chi tiết|Full Address
Đường dẫn Google Maps|Google Maps URL
Đường dẫn nhúng bản đồ (URL trong thuộc tính src của iframe Google Maps)|Map Embed URL (the src URL from the Google Maps iframe)
Đường dẫn chỉ đường Google Maps|Google Maps Directions URL
Chỉnh sửa: Thông Tin Footer & Liên Hệ|Edit Footer & Contact Details
1. Người phụ trách phòng Lab (Supervisor)|1. Lab Supervisor
Họ và tên|Full Name
Học hàm / Học vị|Academic Title / Degree
Số điện thoại|Phone Number
Email 2 (Quốc tế)|Email 2 (International)
2. Liên hệ thông tin chung (Contact for Information)|2. General Contact
Học vị / Vị trí|Degree / Position
3. Bản quyền|3. Copyright
Dòng bản quyền|Copyright Notice
Vui lòng nhập đường dẫn Google Maps hợp lệ. Ô nhúng bản đồ cần URL nhúng, không phải toàn bộ mã iframe.|Enter valid Google Maps URLs. The embed field requires the embed URL, not the full iframe code.
Bạn có chắc chắn muốn khôi phục mục này về nội dung mặc định của phòng Lab?|Restore this section to the default lab content?
Khôi phục toàn bộ trang chủ về mặc định gốc?|Restore the entire homepage to its default content?
Quay lại tất cả tin tức (Back to All News)|Back to All News
Sao chép liên kết|Copy Link
Chia sẻ Facebook|Share on Facebook
Chia sẻ Twitter / X|Share on X
Chia sẻ LinkedIn|Share on LinkedIn
In bài viết|Print Article
Ban Biên tập &amp; Nhóm Truyền thông Khoa học — Phòng Thí nghiệm Nghiên cứu Hướng tới 100% Năng lượng Tái tạo (100RE Lab), Đại học Bách Khoa Hà Nội.|Editorial &amp; Science Communications Team — 100% Renewable Energy Laboratory (100RE Lab), Hanoi University of Science and Technology.
Bài Viết Khác Cùng Chuyên Mục (Related Articles)|Related Articles
Đã sao chép liên kết bài viết vào bộ nhớ tạm!|Article link copied to clipboard.
Chỉnh Sửa Bài Báo / Edit News Article|Edit News Article
Soạn Bài Báo Mới / Create News Article|Create News Article
Soạn Bài Báo Mới / News Composer|News Composer
Soạn Thảo (Editor)|Editor
Xem Trước Bài Viết (Live Preview)|Live Preview
Tiêu Đề Bài Báo (Article Headline)|Article Headline
Nhập tiêu đề bài báo...|Enter the article headline...
Chuyên Mục (Category)|Category
 (Hợp tác quốc tế)|
 (Hội thảo khoa học)|
 (Thanh niên & Khí hậu)|
 (Giải thưởng & Thành tích)|
 (Học bổng)|
 (Hoạt động Lab)|
Tác Giả / Người Đăng (Author)|Author
Tên tác giả hoặc Ban biên tập...|Author or editorial team...
Ngày Đăng (Publication Date)|Publication Date
hoặc 15/03/2026|or March 15, 2026
Thời Lượng Đọc (Read Time)|Read Time
Ảnh Bìa Bài Viết (Featured Cover Image)|Featured Cover Image
hoặc URL ảnh|or image URL
Tải Ảnh Lên|Upload Image
Chú Thích Ảnh Bìa (Cover Image Caption)|Cover Image Caption
Ghi chú ảnh (hiển thị dưới ảnh bài báo)...|Caption displayed below the article image...
Đoạn Tóm Tắt Ngắn / Sapo (Excerpt / Lead Summary)|Excerpt / Lead Summary
Tóm tắt ngắn 1-2 câu về nội dung chính của bài báo...|Summarize the article in one or two sentences...
Toàn Văn Nội Dung Bài Báo (Full Rich Article Body)|Full Article Body
H3 Tiêu Đề|H3 Heading
B Đậm|B Bold
I Nghiêng|I Italic
Trích Dẫn|Quote
Danh Sách|List
Chèn Ảnh|Insert Image
Đoạn &lt;p&gt;|Paragraph &lt;p&gt;
Nhập các đoạn văn của bài báo, có thể sử dụng các nút định dạng phía trên hoặc gõ văn bản tự do...|Write your article. Use the formatting buttons above or enter plain text...
Từ Khóa / Thẻ Tag (Tags - cách nhau bằng dấu phẩy)|Tags (comma-separated)
Đăng / Lưu Bài Viết|Publish / Save Article
Tiêu Đề Bài Báo|Article Headline
Hôm nay|Today
Nội dung...|Content...
Nhập đường dẫn URL ảnh (Image URL):|Enter the image URL:
Nhập chú thích ảnh (Caption):|Enter the image caption:
Hình ảnh minh họa|Illustration
Đã lưu bài viết.|Article saved.
Xác Nhận Xóa Bài Viết|Confirm Article Deletion
Bạn có chắc chắn muốn xóa bài báo / sự kiện này không? Thao tác này không thể hoàn tác.|Delete this article or event? This cannot be undone.
Xóa Bài Viết|Delete Article
Bạn có chắc chắn muốn xóa bài báo này không?|Delete this article?
Đã xóa bài báo thành công!|Article deleted.
Tên hệ thống|System Name
Giới thiệu hệ thống|System Overview
Vị trí lắp đặt|Installation Location
Công suất / quy mô|Capacity / Scale
Đường dẫn truy cập hệ thống|System URL
Cấu trúc hệ thống|System Architecture
Chức năng chính|Key Features
Thông số kỹ thuật|Technical Specifications
Vị trí|Location
Thông số|Specification
Thông tin giới thiệu hệ thống sẽ được cập nhật tại đây.|The system overview will be published here.
Chỉnh sửa thông tin &amp; ảnh|Edit Content &amp; Photos
Nội dung và ảnh của|Content and photos for this
nhóm nghiên cứu|research team
hệ thống|system
này được lưu riêng. Các thay đổi chỉ hiển thị công khai sau khi bạn lưu thành công.|are saved separately. Changes are published only after a successful save.
Mỗi dòng một thông số, ví dụ: Công suất: 3.6 kWp|Enter one specification per line, e.g. Capacity: 3.6 kWp
Không bắt buộc. Sử dụng đường dẫn http:// hoặc https://.|Optional. Use an http:// or https:// URL.
Hình ảnh nghiên cứu, mô hình & thí nghiệm|Research, Models & Experiments
Ảnh hệ thống thực tế|Real System Photos
Tối đa 8 ảnh cho mỗi hệ thống. Chọn JPG, PNG hoặc WebP, tối đa 10 MB/ảnh. Ảnh được tối ưu trước khi lưu.|Add up to 8 photos per profile. Choose JPG, PNG, or WebP files up to 10 MB each. Images are optimized before saving.
Chọn ảnh từ máy|Choose Photos
Chụp ảnh (thiết bị có camera)|Take Photo (camera-enabled devices)
Lưu &amp; hiển thị|Save &amp; Publish
Hủy thay đổi|Discard Changes
Tài liệu / demo nghiên cứu|Research Resources / Demo
Mở hệ thống|Open System
Bối cảnh & mục tiêu nghiên cứu|Research Context & Objectives
Các hướng nghiên cứu đang triển khai|Current Research Directions
Phương pháp & công cụ|Methods & Tools
Kết quả & ứng dụng|Results & Applications
Định hướng tiếp theo|Future Directions
Nội dung nghiên cứu chi tiết đang được cập nhật.|Detailed research information will be published here.
Thông tin hệ thống|System Information
Chưa có mô tả chi tiết cho hệ thống này.|A detailed description has not been added yet.
Về nhóm nghiên cứu|About the Research Team
Công bố khoa học|Publications
Thông số &amp; triển khai|Specifications &amp; Deployment
Thông số kỹ thuật đang được cập nhật.|Technical specifications will be published here.
Hình ảnh nghiên cứu & thí nghiệm|Research & Experimental Images
Hình ảnh|Images
Chưa có ảnh nghiên cứu. Sơ đồ, mô hình, kết quả mô phỏng và ảnh thí nghiệm của nhóm sẽ được hiển thị tại đây.|No research images yet. Diagrams, models, simulation results, and experiment photos will appear here.
Chưa có ảnh hệ thống thực tế. Ảnh chụp thiết bị, khu vực lắp đặt và giao diện vận hành sẽ được hiển thị tại đây.|No system photos yet. Equipment, installation, and operating interface photos will appear here.
Thêm hình ảnh|Add Images
Ảnh xem trước|Image Preview
Xóa ảnh|Remove Photo
Ảnh đã được gỡ khỏi bản chỉnh sửa. Bấm Lưu để áp dụng.|Photo removed from the draft. Save to apply this change.
Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP.|Choose a JPG, PNG, or WebP image.
Ảnh vượt quá 10 MB. Vui lòng chọn ảnh nhỏ hơn.|This image exceeds 10 MB. Choose a smaller file.
Không đọc được ảnh. Vui lòng chọn một ảnh JPG, PNG hoặc WebP hợp lệ.|This image could not be read. Choose a valid JPG, PNG, or WebP file.
Mỗi hệ thống có tối đa 8 ảnh. Vui lòng chọn ít ảnh hơn.|Each profile supports up to 8 photos. Select fewer files.
Đang xử lý ảnh…|Processing images…
Ảnh đã sẵn sàng. Thêm chú thích và bấm Lưu để hiển thị công khai.|Photos are ready. Add captions and save to publish.
Vui lòng nhập tên hệ thống.|Enter a profile name.
Đường dẫn hệ thống phải bắt đầu bằng http:// hoặc https://.|The URL must begin with http:// or https://.
Đang lưu nội dung và ảnh…|Saving content and photos…
Đã lưu. Nội dung và ảnh đã được hiển thị công khai.|Saved. Your content and photos are now published.
Bản chỉnh sửa vẫn được giữ để bạn thử lại.|Your draft has been retained. Please try again.
Đang tải thông tin hệ thống…|Loading profile information…
Chưa tải được nội dung từ máy chủ.|Unable to load content from the server.
Thử lại|Try Again
Không tìm thấy nhóm nghiên cứu|Research team not found
Tên nhóm / lĩnh vực nghiên cứu|Team Name / Research Area
Giới thiệu tổng quan|Overview
Bối cảnh, bài toán & mục tiêu nghiên cứu|Research Context, Questions & Objectives
Các hướng nghiên cứu đang triển khai (mô tả chi tiết)|Current Research Directions (detailed description)
Phương pháp, mô hình & công cụ|Methods, Models & Tools
Kết quả nghiên cứu & ứng dụng|Research Results & Applications
Liên kết tài liệu / demo nghiên cứu|Research Resources / Demo URL
Hướng nghiên cứu, phương pháp, kết quả và hình ảnh hoạt động nghiên cứu của nhóm.|Explore the team's research directions, methods, results, and experimental work.
Datasheet / Tài liệu chính hãng|Manufacturer Datasheet
Thêm Thành Viên Mới|Add New Member
Thêm Thành Viên|Add Member
Thêm thành viên vào nhóm|Add member to
Thêm thành viên|Add Member
Điền thông tin thành viên và tải ảnh đại diện lên hệ thống|Enter member details and upload a profile photo.
Họ và Tên *|Full Name *
VD: Nguyễn Văn A|e.g. Alex Nguyen
Nhóm Nghiên Cứu *|Research Team *
Chức Vụ / Vị Trí *|Role / Position *
Tiểu Sử / Hướng Nghiên Cứu|Biography / Research Interests
Mô tả tóm tắt hướng nghiên cứu, đề tài tham gia...|Describe research interests and projects...
Ảnh Đại Diện|Profile Photo
Chưa chọn ảnh|No photo selected
Căn chỉnh / Cắt lại ảnh|Adjust / Crop Photo
Lưu Thông Tin Thành Viên|Save Member Details
Cắt &amp; Căn Chỉnh Ảnh Đại Diện|Crop &amp; Adjust Profile Photo
Kéo thả khung cắt, xoay hoặc phóng to thu nhỏ để có ảnh chân dung chuẩn tỷ lệ thẻ Lab|Drag the crop frame, rotate, or zoom to fit the lab profile format.
Xem trước (Card Lab)|Profile Preview
Tỷ lệ 3:4 chuẩn thẻ thành viên|3:4 member profile format
Tỷ lệ:|Aspect Ratio:
3:4 (Chuẩn)|3:4 (Standard)
1:1 (Vuông)|1:1 (Square)
Tự do|Freeform
Xoay trái 90°|Rotate Left 90°
Xoay phải 90°|Rotate Right 90°
Lật ngang|Flip Horizontally
Phóng to|Zoom In
Thu nhỏ|Zoom Out
Đặt lại|Reset
Cắt &amp; Sử Dụng Ảnh Này|Crop &amp; Use Photo
Toà Soạn / Admin Newsroom Active|Editorial Mode
Bạn có quyền viết bài mới, chỉnh sửa hoặc xóa tin tức bài viết trên trang.|You can create, edit, and delete news articles.
Soạn Bài Báo Mới (Write News Article)|Write News Article
Tìm kiếm bài viết theo tiêu đề, tác giả, nội dung hoặc từ khóa...|Search by title, author, content, or keyword...
Tất Cả Bài Viết (All)|All Articles
Hợp Tác Quốc Tế (International)|International
Hội Thảo &amp; Tọa Đàm (Workshops)|Workshops
Thanh Niên &amp; Khí Hậu (Climate)|Climate
Giải Thưởng &amp; Học Bổng (Awards)|Awards &amp; Scholarships
Mở tất cả (Expand All)|Expand All
Thu gọn (Collapse All)|Collapse All
Chuyển tới năm (Jump to year)...|Jump to year...
Chuyển tới năm|Jump to year
Xem hồ sơ Nguyen Duc Tuyen trên Google Scholar|View Nguyen Duc Tuyen on Google Scholar
Thêm bài báo mới (Add Publication)|Add Publication
Không tìm thấy bài báo phù hợp|No matching publications
Không có bài báo nào khớp với từ khóa|No publications match
bộ lọc đã chọn|the selected filters
Hãy thử từ khóa khác hoặc đặt lại bộ lọc.|Try another keyword or reset the filters.
Đặt lại tất cả bộ lọc|Reset All Filters
Năm ${y} (${yearGroups[y].length} bài)|Year ${y} (${yearGroups[y].length} publications)
Xem bài báo gốc / Google Scholar|View Original Publication / Google Scholar
Chỉnh sửa|Edit
Cập nhật|Update
Đóng|Close
Sửa|Edit
Xóa|Delete
'''

def run():
    pairs = [line.split('|', 1) for line in COPY.splitlines() if '|' in line]
    pairs.sort(key=lambda pair: len(pair[0]), reverse=True)
    paths = list(ROOT.glob('*.html')) + list((ROOT / 'assets/js').glob('*.js'))
    for path in paths:
        if path.name in ('data.js', 'publications_data.js', 'cropper.min.js'):
            continue
        original = path.read_bytes()
        newline = '\r\r\n' if b'\r\r\n' in original else '\r\n' if b'\r\n' in original else '\n'
        source = original.decode('utf-8').replace('\r\r\n', '\n').replace('\r\n', '\n')
        for vietnamese, english in pairs:
            source = source.replace(vietnamese, english)
            # Some member-page labels were emitted as HTML character references.
            if path.suffix == '.html' and vietnamese in html.unescape(source):
                encoded = ''.join(c if ord(c) < 128 else f'&#{ord(c)};' for c in vietnamese)
                source = source.replace(encoded, english)
        if source.encode('utf-8') != original:
            path.write_bytes(source.replace('\n', newline).encode('utf-8'))
            print(path.relative_to(ROOT))

if __name__ == '__main__':
    run()
