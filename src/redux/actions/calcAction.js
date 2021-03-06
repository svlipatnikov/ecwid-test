import { SET_CALC_RESULT } from 'redux/types';
import { rowNormalHeight } from 'restrictions';
import store from 'redux/store';

export const calcAction = () => {
  const galery = store.getState().galeryReducer.galleryImages;

  const galeryWidth = Math.ceil(document.body.scrollWidth);

  const cardsArr = [];
  const rowsArr = [];
  let rowNumber = 0;
  let rowWidth = 0;

  galery.forEach((image, index) => {
    const cardNormalWidth = (rowNormalHeight / image.height) * image.width;

    if (rowWidth + cardNormalWidth > galeryWidth) {
      rowNumber++;
      rowWidth = cardNormalWidth;
    } else {
      rowWidth = rowWidth + cardNormalWidth;
    }

    cardsArr[index] = {
      index,
      cardNormalWidth,
      rowNumber,
    };

    rowsArr[rowNumber] = Math.ceil(rowWidth);
  });

  return {
    type: SET_CALC_RESULT,
    payload: { galeryWidth, cardsArr, rowsArr },
  };
};
