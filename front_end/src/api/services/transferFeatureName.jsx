//chuyển đổi tên feature thành tên route
export const getListRoute = (features) => {
    // const listFeature = JSON.parse(features) // đổi chuỗi thành mảng
    const listRoute = []
    features.map((f) => {
        if(f === "monan"){
            listRoute.push("productManagement");
        }
        else if(f === "banan"){
            listRoute.push("table");
        }
        else if(f === "donhang"){
            listRoute.push("orders");
        }
        else if(f === "bep"){
            listRoute.push("kitchen");
        }
        else if(f === "nhanvien"){
            listRoute.push("staff");
        }
        else if(f === "taikhoan"){
            listRoute.push("account");
        }
        else if(f === "phanquyen"){
            listRoute.push("roleLayer");
        }
    })
    return (listRoute);
} 