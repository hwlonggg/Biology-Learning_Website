/**
 * BIO-VERSE AI ENGINE v2.0 Pro
 * Hệ thống chuyên gia phân tích dữ liệu Sinh học lớp 8
 * Developed for: Nguyen Hoang Long
 */

class BioAI {
    constructor() {
        // 1. BỘ NÃO TRI THỨC (KNOWLEDGE BASE) - Được cấu trúc theo mô hình Graph
        this.knowledgeBase = {
            "he_van_dong": {
                keywords: ["xương", "cơ", "khớp", "vận động", "gãy xương", "bắp thịt"],
                answer: "Hệ vận động gồm bộ xương và hệ cơ. Xương tạo khung, cơ co dãn giúp ta di chuyển. **Mẹo:** Để xương chắc khỏe, Long nên bổ sung Canxi và Vitamin D nhé!",
                details: "Gồm 206 xương ở người trưởng thành, chia làm 3 phần: xương đầu, xương thân và xương chi."
            },
            "he_tuan_hoan": {
                keywords: ["tim", "máu", "mạch máu", "huyết áp", "nhóm máu", "tâm thất", "tâm nhĩ"],
                answer: "Hệ tuần hoàn gồm tim và hệ mạch. Tim co bóp đẩy máu đi nuôi cơ thể thông qua 2 vòng tuần hoàn (vòng lớn và vòng nhỏ).",
                details: "Máu gồm huyết tương (55%) và các tế bào máu (45% gồm hồng cầu, bạch cầu, tiểu cầu)."
            },
            "he_ho_hap": {
                keywords: ["phổi", "thở", "oxy", "khí quản", "phế quản", "co2", "trao đổi khí"],
                answer: "Hệ hô hấp giúp cơ thể lấy O₂ và thải CO₂. Quá trình trao đổi khí diễn ra tại các phế nang trong phổi.",
                details: "Cấu tạo gồm: Đường dẫn khí (mũi, họng, thanh quản, khí quản, phế quản) và hai lá phổi."
            },
            "he_tieu_hoa": {
                keywords: ["dạ dày", "ruột", "gan", "ăn", "tiêu hóa", "enzym", "mật", "tụy"],
                answer: "Hệ tiêu hóa biến đổi thức ăn thành chất dinh dưỡng. Quá trình này bắt đầu từ khoang miệng và kết thúc ở ruột già.",
                details: "Gồm các cơ quan trong ống tiêu hóa và các tuyến tiêu hóa (tuyến nước bọt, gan, tụy)."
            },
            "he_than_kinh": {
                keywords: ["não", "tủy sống", "phản xạ", "dây thần kinh", "thần kinh", "neuron"],
                answer: "Đây là cơ quan điều khiển cao cấp nhất. Hệ thần kinh gồm bộ não, tủy sống và các dây thần kinh.",
                details: "Phân làm 2 bộ phận: Trung ương (Não, tủy sống) và Ngoại biên (Các dây thần kinh, hạch thần kinh)."
            },
            "he_bai_tiet": {
                keywords: ["thận", "nước tiểu", "bàng quang", "lọc máu", "niệu quản"],
                answer: "Thận lọc máu để tạo thành nước tiểu, giúp loại bỏ các chất độc hại ra khỏi cơ thể.",
                details: "Mỗi quả thận chứa khoảng 1 triệu đơn vị chức năng (nephron) để lọc máu."
            },
            "dna_gen": {
                keywords: ["dna", "adn", "gen", "di truyền", "nhiễm sắc thể"],
                answer: "DNA là phân tử mang thông tin di truyền của sinh vật. Nó quy định mọi đặc điểm từ màu da đến chiều cao của Long.",
                details: "Cấu trúc xoắn kép gồm 4 loại đơn phân: A, T, G, X."
            }
        };

        // 2. CÁC CÂU TRẢ LỜI MẶC ĐỊNH (FALLBACKS)
        this.greetings = ["Chào Long!", "Hệ thống Bio-AI đã sẵn sàng!", "Bạn muốn khám phá bí mật nào của cơ thể người?"];
        this.unknown = [
            "Câu hỏi này khá chuyên sâu, mình đang tra cứu thêm trong thư viện y khoa.",
            "Long thử hỏi về các hệ cơ quan như Tim, Não, Dạ dày xem sao?",
            "Bio-AI chưa tìm thấy dữ liệu này, nhưng theo mình biết thì cơ thể người có rất nhiều điều kỳ diệu!"
        ];
    }

    // 3. BỘ MÁY PHÂN TÍCH NGÔN NGỮ (NLP ENGINE)
    process(input) {
        const text = input.toLowerCase();
        
        // Kiểm tra lời chào
        if (text.includes("chào") || text.includes("hello")) {
            return this.getRandom(this.greetings);
        }

        // Thuật toán tìm kiếm từ khóa thông minh
        let bestMatch = null;
        let maxScore = 0;

        for (let key in this.knowledgeBase) {
            let score = 0;
            this.knowledgeBase[key].keywords.forEach(word => {
                if (text.includes(word)) score++;
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = this.knowledgeBase[key];
            }
        }

        if (bestMatch && maxScore > 0) {
            return `${bestMatch.answer} <br><br> <strong>Chi tiết:</strong> ${bestMatch.details}`;
        }

        return this.getRandom(this.unknown);
    }

    getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}

// 4. KHỞI TẠO VÀ ĐIỀU KHIỂN UI
const bioExpert = new BioAI();

function sendMessage() {
    const input = document.getElementById('chat-input');
    const content = document.getElementById('chat-content');
    const userText = input.value.trim();

    if (!userText) return;

    // Hiển thị tin nhắn người dùng
    content.innerHTML += `
        <div class="flex justify-end mb-4 animate-fade-in">
            <div class="bg-cyan-600/40 p-3 rounded-2xl rounded-tr-none border border-cyan-400/30 max-w-[80%] shadow-lg">
                <span class="text-xs text-cyan-300 block mb-1">Long Nguyen</span>
                ${userText}
            </div>
        </div>`;

    input.value = '';

    // AI xử lý (với độ trễ giả lập suy nghĩ)
    setTimeout(() => {
        const loadingId = "ai-loading-" + Date.now();
        content.innerHTML += `
            <div id="${loadingId}" class="flex mb-4">
                <div class="bg-white/10 p-3 rounded-2xl rounded-tl-none border-l-4 border-cyan-400 animate-pulse">
                    Đang giải mã dữ liệu sinh học...
                </div>
            </div>`;
        content.scrollTop = content.scrollHeight;

        setTimeout(() => {
            document.getElementById(loadingId).remove();
            const response = bioExpert.process(userText);
            
            content.innerHTML += `
                <div class="flex mb-4 animate-slide-in">
                    <div class="bg-white/10 p-4 rounded-2xl rounded-tl-none border-l-4 border-cyan-400 max-w-[85%] shadow-2xl">
                        <span class="text-xs text-cyan-400 font-bold block mb-1 uppercase tracking-tighter">Bio-Verse Intelligence</span>
                        ${response}
                    </div>
                </div>`;
            content.scrollTop = content.scrollHeight;
            
            // Hiệu ứng âm thanh chuyên nghiệp
            new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3').play().catch(e => {});
        }, 800);
    }, 200);
}

// Lắng nghe sự kiện Enter
document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
