export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    date: string;
    author: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        title: 'Xu hướng thời trang nam 2024',
        excerpt: 'Khám phá những xu hướng thời trang nam nổi bật nhất năm 2024, từ phong cách tối giản đến những họa tiết táo bạo.',
        image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800',
        category: 'Xu hướng',
        date: '25/11/2024',
        author: 'Minh Anh'
    },
    {
        id: '2',
        title: 'Cách phối đồ công sở lịch lãm',
        excerpt: 'Hướng dẫn chi tiết cách phối đồ công sở nam giúp bạn tự tin và chuyên nghiệp trong mọi tình huống.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
        category: 'Hướng dẫn',
        date: '20/11/2024',
        author: 'Tuấn Anh'
    },
    {
        id: '3',
        title: 'Bí quyết chọn áo sơ mi phù hợp',
        excerpt: 'Làm thế nào để chọn được chiếc áo sơ mi hoàn hảo cho dáng người của bạn? Cùng tìm hiểu ngay.',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
        category: 'Mẹo hay',
        date: '15/11/2024',
        author: 'Hoàng Long'
    },
    {
        id: '4',
        title: 'Phong cách streetwear cho nam giới',
        excerpt: 'Streetwear không chỉ là xu hướng mà còn là cách thể hiện cá tính. Khám phá cách mix đồ streetwear ấn tượng.',
        image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800',
        category: 'Xu hướng',
        date: '10/11/2024',
        author: 'Minh Anh'
    },
    {
        id: '5',
        title: 'Cách bảo quản quần áo đúng cách',
        excerpt: 'Những mẹo đơn giản giúp quần áo của bạn luôn như mới và bền đẹp theo thời gian.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800',
        category: 'Mẹo hay',
        date: '05/11/2024',
        author: 'Tuấn Anh'
    },
    {
        id: '6',
        title: 'Thời trang bền vững - Xu hướng tương lai',
        excerpt: 'Tìm hiểu về thời trang bền vững và cách ATINO đang đóng góp vào việc bảo vệ môi trường.',
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800',
        category: 'Tin tức',
        date: '01/11/2024',
        author: 'Hoàng Long'
    }
];
