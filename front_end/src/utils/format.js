// export function formatCurrency(amount) {
//     return amount.toLocaleString('it-IT');  // 'it-IT' sử dụng dấu chấm cho phân cách hàng nghìn
// }
export function formatCurrency(amount) {
    const rounded = Number(amount).toFixed(0); // làm tròn 2 chữ số thập phân
    return Number(rounded).toLocaleString('it-IT'); // dùng định dạng kiểu Ý
}