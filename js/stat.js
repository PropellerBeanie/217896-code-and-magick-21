'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_COLOR = `#fff`;
const CLOUD_PADDING_X = 30;
const CLOUD_PADDING_Y = CLOUD_PADDING_X / 2;
const SHADOW_COLOR = `rgba(0, 0, 0, 0.3)`;
const SHADOW_OFFSET = 10;
const USER_COLOR = `rgba(255, 0, 0, 1)`;
const FONT_SIZE = 16;
const FONT_FAMILY = `PT Mono`;
const FONT = `${FONT_SIZE}px ${FONT_FAMILY}`;
const TEXT_COLOR = `#000`;
const TEXT_MARGIN = FONT_SIZE / 2;
const COLUMN_MAX_HEIGHT = CLOUD_HEIGHT - CLOUD_PADDING_X - 4 * FONT_SIZE - 4 * TEXT_MARGIN;
const COLUMN_WIDTH = 40;
const COLUMN_MARGIN = 50;

let renderRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

let getRandomNumber = function (max) {
  return (Math.floor(Math.random() * (max + 1)));
};

let getRandomColor = function () {
  return (`hsl(240, ${getRandomNumber(10) * 10}%, 50%)`);
};

let getUserColor = function (userName) {
  if (userName === `Вы`) {
    return (USER_COLOR);
  } else {
    return (getRandomColor());
  }
};

let renderText = function (ctx, color, text, x, y) {
  ctx.fillStyle = color;
  ctx.font = FONT;
  ctx.fillText(
      text,
      x,
      y
  );
};

let renderColumn = function (ctx, maxTime, name, time, x, yTime, yColumn, yName) {
  renderText(ctx, TEXT_COLOR, name, x, yName);
  renderRect(ctx, x, yColumn, COLUMN_WIDTH, -COLUMN_MAX_HEIGHT / maxTime * time, getUserColor(name));
  renderText(ctx, TEXT_COLOR, Math.floor(time), x, yTime);
};

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, CLOUD_X + SHADOW_OFFSET, CLOUD_Y + SHADOW_OFFSET, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  renderRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + CLOUD_PADDING_X, CLOUD_Y + CLOUD_PADDING_Y + FONT_SIZE);
  ctx.fillText(`Список результатов: `, CLOUD_X + CLOUD_PADDING_X, CLOUD_Y + CLOUD_PADDING_Y + 2 * FONT_SIZE);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    renderColumn(
        ctx,
        maxTime,
        names[i],
        times[i],
        CLOUD_X + CLOUD_PADDING_X + i * (COLUMN_WIDTH + COLUMN_MARGIN),
        CLOUD_Y + CLOUD_PADDING_Y + 2 * FONT_SIZE + 3 * TEXT_MARGIN + COLUMN_MAX_HEIGHT * (1 - 1 / maxTime * times[i]),
        CLOUD_Y + CLOUD_PADDING_Y + 3 * FONT_SIZE + 3 * TEXT_MARGIN + COLUMN_MAX_HEIGHT,
        CLOUD_Y + CLOUD_PADDING_Y + 4 * FONT_SIZE + 3 * TEXT_MARGIN + COLUMN_MAX_HEIGHT
    );
  }
};
