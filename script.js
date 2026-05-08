// --- DỮ LIỆU CHI TIẾT 8 HỆ CƠ QUAN (PROFESSIONAL DATA STRUCTURE) ---
const detailedSystems = {
    1: { // Hệ Tuần Hoàn
        parts: [
            { name: "Tim", img: "https://tse2.mm.bing.net/th?id=OIP.C0q7uMv8X3_6_Z_2_Z_2", structure: "Gồm 4 ngăn: 2 tâm nhĩ, 2 tâm thất. Cấu tạo từ cơ tim đặc biệt.", function: "Co bóp liên tục để đẩy máu đi qua 2 vòng tuần hoàn." },
            { name: "Động mạch", img: "https://via.placeholder.com/150/00f2fe/fff?text=Artery", structure: "Thành mạch dày, có nhiều sợi đàn hồi.", function: "Dẫn máu từ tim đến các cơ quan với áp lực cao." },
            { name: "Tĩnh mạch", img: "https://via.placeholder.com/150/00f2fe/fff?text=Vein", structure: "Thành mạch mỏng hơn, có van một chiều (ở chi).", function: "Dẫn máu từ các cơ quan về tim." }
        ]
    },
    2: { // Hệ Thần Kinh
        parts: [
            { name: "Não bộ", img: "https://via.placeholder.com/150/bc13fe/fff?text=Brain", structure: "Gồm chất xám (ngoài) và chất trắng (trong). Chia làm nhiều thùy.", function: "Trung tâm điều khiển mọi hoạt động phức tạp và ý thức." },
            { name: "Tủy sống", img: "https://via.placeholder.com/150/bc13fe/fff?text=Spinal", structure: "Nằm trong cột sống, là trung gian truyền dẫn tin hiệu.", function: "Điều khiển các phản xạ không điều kiện." }
        ]
    },
    3: { // Hệ Hô Hấp
        parts: [
            { name: "Phổi", img: "https://via.placeholder.com/150/4facfe/fff?text=Lungs", structure: "Gồm hàng triệu phế nang tạo diện tích tiếp xúc lớn.", function: "Nơi diễn ra quá trình trao đổi khí O2 và CO2." },
            { name: "Khí quản", img: "https://via.placeholder.com/150/4facfe/fff?text=Trachea", structure: "Ống dẫn có các vòng sụn hình chữ C để luôn mở.", function: "Dẫn khí vào và ra khỏi phổi, làm sạch không khí." }
        ]
    }
    // ... Bạn có thể thêm tiếp cho đủ 8 hệ vào đây
};

// --- HÀM KHỞI TẠO MÔ HÌNH 3D (WIREFRAME HUMAN) ---
function init3DHuman() {
    const container = document.getElementById('3d-viewport');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Tạo một khối hình người mô phỏng (Hologram)
    const geometry = new THREE.CylinderGeometry(1, 0.8, 4, 32);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00f2fe, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.5 
    });
    const human = new THREE.Mesh(geometry, material);
    scene.add(human);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        human.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
}

// --- HÀM XỬ LÝ KHI BẤM VÀO 1 HỆ CƠ QUAN (Ví dụ Hệ 1, 2, 3...) ---
function openSystem(systemId) {
    const organList = document.getElementById('organ-selection');
    const infoArea = document.getElementById('organ-info');
    const data = detailedSystems[systemId];

    if (!data) {
        organList.innerHTML = `<p class="text-red-400">Dữ liệu hệ thống này đang được cập nhật...</p>`;
        return;
    }

    // 1. Cập nhật danh sách cơ quan bên trái
    organList.innerHTML = `<h4 class="font-bold text-cyan-400 mb-4 uppercase">Cơ quan trong hệ:</h4>`;
    data.parts.forEach((part, index) => {
        const item = document.createElement('div');
        item.className = 'organ-item';
        item.innerHTML = `<strong>${part.name}</strong> <i class="fas fa-chevron-right float-right mt-1 opacity-50"></i>`;
        item.onclick = () => showOrganDetail(part);
        organList.appendChild(item);
    });

    // 2. Reset khung thông tin bên phải
    infoArea.innerHTML = `
        <div class="text-center animate-pulse">
            <i class="fas fa-hand-pointer text-4xl mb-2 text-cyan-400"></i>
            <p>Chọn một cơ quan cụ thể để xem chi tiết</p>
        </div>
    `;
}

// --- HÀM HIỂN THỊ CHI TIẾT CƠ QUAN ---
function showOrganDetail(part) {
    const infoArea = document.getElementById('organ-info');
    
    infoArea.innerHTML = `
        <div class="organ-detail-card w-full">
            <img src="${part.img}" alt="${part.name}" class="w-full h-48 object-cover rounded-xl mb-6 border-2 border-cyan-400/30 shadow-2xl">
            <h3 class="text-3xl font-bold text-cyan-400 mb-4 font-orbit">${part.name.toUpperCase()}</h3>
            
            <div class="space-y-4">
                <div class="bg-white/5 p-4 rounded-lg">
                    <span class="text-xs font-bold text-gray-500 uppercase">Cấu tạo:</span>
                    <p class="text-gray-200 mt-1">${part.structure}</p>
                </div>
                <div class="bg-white/5 p-4 rounded-lg border-l-4 border-green-500">
                    <span class="text-xs font-bold text-gray-500 uppercase">Chức năng:</span>
                    <p class="text-gray-200 mt-1">${part.function}</p>
                </div>
            </div>

            <button onclick="playBioSound()" class="mt-6 w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400 rounded-lg transition">
                <i class="fas fa-volume-up mr-2"></i> Nghe thuyết minh
            </button>
        </div>
    `;
    
    // Hiệu ứng âm thanh khi bấm
    new Audio('https://www.soundjay.com/buttons/sounds/button-37.mp3').play().catch(e => {});
}

// Khởi tạo mô hình 3D khi trang web load
window.addEventListener('DOMContentLoaded', () => {
    init3DHuman();
});
