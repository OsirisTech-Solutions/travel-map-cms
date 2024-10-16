import { message, Modal } from 'antd';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\\+\\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\\+\\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\w-_]*)?\??(?:[-\\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const modalConfirmDelete = (onOk?: any) => {
  Modal.confirm({
    title: 'Bạn có chắc chắn muốn xóa?',
    okText: 'Đồng ý',
    okType: 'danger',
    cancelText: 'Hủy',
    onOk,
  });
};

export const nonAccent = (str: string = '') => {
  let string = str;
  string = string.toLowerCase();
  string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  string = string.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  string = string.replace(/đ/g, 'd');
  string = string.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  string = string.replace(/\u02C6|\u0306|\u031B/g, '');
  return string;
};

export const beforeunload = (e: any) => {
  const event = e || window.event;
  if (event) {
    event.returnValue = 'Sure?';
  }
  return 'Sure?';
};

export const popState = (url: string) => {
  window.history.pushState(null, '', url);
};

export const showError = (error: any) => {
  if (process.env.NODE_ENV === 'dev') {
    Modal.error({
      title: 'Đã có lỗi xảy ra. VUI LÒNG CHỤP ẢNH LẠI và gửi cho dev nhé ❤',
      content: JSON.stringify(error),
    });
  } else {
    message.error('Đã có lỗi xảy ra!');
  }
};
// @ts-ignore
export function splitArray(array, splitNumber) {
  const result = [];
  const chunkSize = Math.ceil(array.length / splitNumber); // Determine chunk size

  for (let i = 0; i < splitNumber; i++) {
    const start = i * chunkSize;
    const end = start + chunkSize;
    result.push(array.slice(start, end));
  }

  return result.filter((chunk) => chunk.length > 0); // Remove empty arrays
}
