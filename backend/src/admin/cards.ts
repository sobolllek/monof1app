import { Context } from 'telegraf';
import { prisma } from '../db/client';
import { adminStates } from './handlers';
import { findUser, findAllUsers } from './helpers';
import { logAction } from './utils';
import { handleBackToAdmin } from './utils';
import { BlobService } from '../services/blobService';
import { getCardEditKeyboard, getCardEditNavigationKeyboard, getCardsKeyboard } from './keyboards';

// Handlers from original handlers.ts
export async function handleUploadCards(ctx: Context) {
  await ctx.reply(
    '📸 *Загрузка карт*\n\n' +
    'Отправьте изображение карты с подписью в формате:\n\n' +
    'Название карты\n' +
    'Тип (driver|duo|team|team_principal|track|car|collab|historical|race_results|limited|special)\n' +
    'Команда (опционально)\n' +
    'Редкость (ultrasoft|supersoft|soft|medium|hard|intermediate|wet)\n' +
    'Описание\n' +
    'ID пака\n\n' +
    '*Пример:*\n' +
    'Lewis Hamilton\n' +
    'driver\n' +
    'Mercedes\n' +
    'soft\n' +
    '7-кратный чемпион мира\n' +
    '1',
    { parse_mode: 'Markdown' }
  );
  adminStates.set(ctx.from!.id.toString(), { action: 'upload_cards_confirm' });
  await ctx.answerCbQuery();
}

export async function handleUploadCardsConfirm(ctx: Context) {
  await ctx.reply(
    '⚠️ *Подтверждение загрузки*\n\n' +
    'Вы уверены, что хотите начать загрузку карт?',
    {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Да, начать загрузку', callback_data: 'admin_upload_cards_start' },
            { text: '❌ Отмена', callback_data: 'admin_back' }
          ]
        ]
      }
    }
  );
  await ctx.answerCbQuery();
}

export async function handleUploadCardsStart(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'upload_cards' });
  await ctx.reply('Отправьте изображение карты с подписью в указанном формате');
  await ctx.answerCbQuery();
}

export async function handleAddPack(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'add_pack' });
  await ctx.reply('Введите данные пака в формате:\n\nНазвание|Описание|Цена\n\nПример: "Starter Pack|Начальный пак|500"');
  await ctx.answerCbQuery();
}

export async function handleEditCard(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'edit_card' });
  await ctx.reply('Введите ID карты для изменения:');
  await ctx.answerCbQuery();
}

export async function handleEditCardField(ctx: Context, field: string) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.currentCard) {
    await ctx.reply('Сессия редактирования не найдена');
    adminStates.delete(userId);
    return;
  }

  adminStates.set(userId, { action: 'edit_card_enter_value', data: { ...state.data, field } });

  const fieldNames: Record<string, string> = {
    name: 'название',
    type: 'тип (driver|duo|team|team_principal|track|car|collab|historical|race_results|limited|special)',
    team: 'команду',
    rarity: 'редкость (ultrasoft|supersoft|soft|medium|hard|intermediate|wet)',
    description: 'описание',
    packId: 'ID пака (число)',
    isDroppable: 'возможность дропа (true/false)',
    dropLimit: 'лимит дропа (число)',
    year: 'год (число)'
  };

  await ctx.reply(`Введите новое значение для поля "${fieldNames[field]}" карты ${state.data.currentCard.name}:`);
  await ctx.answerCbQuery();
}

export async function handleEditCardCancelField(ctx: Context) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.currentCard) {
    await ctx.reply('Сессия редактирования не найдена');
    adminStates.delete(userId);
    return;
  }

  adminStates.set(userId, { action: 'edit_card_select', data: { currentCard: state.data.currentCard } });

  await ctx.reply(
    `✏️ Редактирование карты: ${state.data.currentCard.name}\n\n` +
    'Выберите поле для редактирования:',
    { reply_markup: getCardEditKeyboard() }
  );
  await ctx.answerCbQuery();
}

export async function handleEditCardContinue(ctx: Context) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.currentCard) {
    await ctx.reply('Сессия редактирования не найдена');
    adminStates.delete(userId);
    return;
  }

  await ctx.reply(
    `✏️ Редактирование карты: ${state.data.currentCard.name}\n\n` +
    'Выберите поле для редактирования:',
    { reply_markup: getCardEditKeyboard() }
  );
  await ctx.answerCbQuery();
}

export async function handleEditAnotherCard(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'edit_card' });
  await ctx.reply('Введите ID карты для изменения:');
  await ctx.answerCbQuery();
}

export async function handleBackToAdminFromEdit(ctx: Context) {
  adminStates.delete(ctx.from!.id.toString());
  await handleBackToAdmin(ctx);
  await ctx.answerCbQuery();
}

export async function handleEditCardConfirm(ctx: Context) {
  const userId = ctx.from!.id.toString();
  const state = adminStates.get(userId);
  if (!state || !state.data?.currentCard) {
    await ctx.reply('Сессия редактирования не найдена');
    adminStates.delete(userId);
    return;
  }

  const { currentCard } = state.data;
  const cardId = currentCard.id;

  try {
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: currentCard
    });

    await logAction('CARD_UPDATE', userId, { cardId, changes: currentCard }, 'admin');
    await ctx.reply('✅ Карта успешно обновлена!');
    adminStates.delete(userId);
    await handleBackToAdmin(ctx);
  } catch (error) {
    console.error('Ошибка при сохранении карты:', error);
    await ctx.reply('❌ Ошибка при сохранении карты.');
  }
  await ctx.answerCbQuery();
}

export async function handleCardsMenu(ctx: Context) {
  await ctx.reply('Управление картами:', { reply_markup: getCardsKeyboard() });
  await ctx.answerCbQuery();
}

export async function handleGiveCards(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'give_cards' });
  await ctx.reply(
    'Введите данные для выдачи карт в формате:\n\n' +
    'username ID_карты количество\n\n' +
    'Можно указать несколько карт через запятую:\n\n' +
    'Пример: "@username 123 5, 456 3, 789 1"\n\n' +
    'Или для массовой выдачи всем пользователям:\n\n' +
    'all ID_карты количество'
  );
  await ctx.answerCbQuery();
}

export async function handleTakeCards(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'take_cards' });
  await ctx.reply(
    'Введите данные для изъятия карт в формате:\n\n' +
    'username ID_карты количество\n\n' +
    'Пример: "@username 123 2"'
  );
  await ctx.answerCbQuery();
}

export async function handleViewCollection(ctx: Context) {
  adminStates.set(ctx.from!.id.toString(), { action: 'view_collection' });
  await ctx.reply('Введите username пользователя для просмотра коллекции:\n\nПример: "@username"');
  await ctx.answerCbQuery();
}

// Handlers from original messageHandler.ts
export async function handleCardUpload(ctx: Context, state: any, photo: any, caption: string) {
  const [name, type, team, rarity, description, packIdStr] = caption.split('\n');
  const packId = parseInt(packIdStr);

  if (!name || !type || !rarity || isNaN(packId)) {
    return await ctx.reply('Неверный формат данных. Проверьте подпись.');
  }

  const validTypes = ['driver', 'duo', 'team', 'team_principal', 'track', 'car', 'collab', 'historical', 'race_results', 'limited', 'special'];
  const validRarities = ['ultrasoft', 'supersoft', 'soft', 'medium', 'hard', 'intermediate', 'wet'];

  if (!validTypes.includes(type.trim())) {
    return await ctx.reply(`Неверный тип карты. Допустимые значения: ${validTypes.join(', ')}`);
  }

  if (!validRarities.includes(rarity.trim())) {
    return await ctx.reply(`Неверная редкость. Допустимые значения: ${validRarities.join(', ')}`);
  }

  try {
    const photoFile = await ctx.telegram.getFile(photo[photo.length - 1].file_id);
    const imageUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${photoFile.file_path}`;
    
    // Используем Vercel Blob
    const fileName = `cards/${Date.now()}_${name.trim().toLowerCase().replace(/\s+/g, '_')}.png`;
    const blob = await BlobService.uploadImageFromUrl(imageUrl, fileName);

    const card = await prisma.card.create({
      data: {
        name: name.trim(),
        type: type.trim(),
        team: team?.trim() || null,
        rarity: rarity.trim(),
        description: description?.trim() || '',
        imageUrl: blob.url, // URL от Vercel Blob
        packId,
        isDroppable: true,
        dropLimit: 100,
        year: 2024
      }
    });

    await logAction('CARD_CREATE', ctx.from!.id.toString(), card, 'admin');
    await ctx.reply(`✅ Карта "${card.name}" создана!\nID: ${card.id}\nИзображение загружено в Vercel Blob`);
  } catch (error) {
    console.error('Ошибка загрузки карты:', error);
    await ctx.reply('❌ Ошибка при загрузке карты. Проверьте формат данных и попробуйте снова.');
  }
}

export async function handlePackCreation(ctx: Context, message: string) {
  const [name, description, priceStr] = message.split('|');
  const price = parseInt(priceStr);

  if (!name || isNaN(price)) {
    return await ctx.reply('Неверный формат данных');
  }

  const pack = await prisma.pack.create({
    data: { name: name.trim(), description: description?.trim(), price }
  });

  await logAction('PACK_CREATE', ctx.from!.id.toString(), pack, 'admin');
  await ctx.reply(`Пак "${pack.name}" создан! ID: ${pack.id}`);
}

export async function handleCardEdit(ctx: Context, cardIdStr: string) {
  const cardId = parseInt(cardIdStr);
  const card = await prisma.card.findUnique({ where: { id: cardId } });

  if (!card) {
    return await ctx.reply('Карта не найдена');
  }

  const userId = ctx.from!.id.toString();
  adminStates.set(userId, { action: 'edit_card_select', data: { cardId, currentCard: card } });

  await ctx.reply(
    `✏️ Редактирование карты: ${card.name}\n\n` +
    'Выберите поле для редактирования:',
    { reply_markup: getCardEditKeyboard() }
  );
}

export async function handleCardEditEnterValue(ctx: Context, messageText: string, state: any) {
  const userId = ctx.from!.id.toString();
  const { field, currentCard } = state.data;
  let newValue: any = messageText.trim();

  const validTypes = ['driver', 'duo', 'team', 'team_principal', 'track', 'car', 'collab', 'historical', 'race_results', 'limited', 'special'];
  const validRarities = ['ultrasoft', 'supersoft', 'soft', 'medium', 'hard', 'intermediate', 'wet'];

  switch (field) {
    case 'type':
      if (!validTypes.includes(newValue)) {
        return await ctx.reply(`❌ Неверный тип карты. Допустимые значения: ${validTypes.join(', ')}`);
      }
      break;
    case 'rarity':
      if (!validRarities.includes(newValue)) {
        return await ctx.reply(`❌ Неверная редкость. Допустимые значения: ${validRarities.join(', ')}`);
      }
      break;
    case 'packId':
    case 'dropLimit':
    case 'year':
      newValue = parseInt(newValue);
      if (isNaN(newValue)) {
        return await ctx.reply('❌ Значение должно быть числом.');
      }
      break;
    case 'isDroppable':
      newValue = newValue.toLowerCase() === 'true';
      if (typeof newValue !== 'boolean') {
        return await ctx.reply('❌ Значение должно быть true или false.');
      }
      break;
  }

  const updatedCard = { ...currentCard, [field]: newValue };
  adminStates.set(userId, { action: 'edit_card_confirm', data: { currentCard: updatedCard } });

  await ctx.reply(
    `Новое значение для ${field}: ${newValue}\n\nПодтвердите изменение:`,
    { reply_markup: getCardEditNavigationKeyboard() }
  );
}

export async function handleGiveCardsAction(ctx: Context, messageText: string) {
  const parts = messageText.split(' ');
  const target = parts[0].toLowerCase();
  const cardDataStr = parts.slice(1).join(' ');

  const cardEntries = cardDataStr.split(',').map(entry => {
    const [cardIdStr, quantityStr] = entry.trim().split(' ');
    return { cardId: parseInt(cardIdStr), quantity: parseInt(quantityStr) };
  });

  if (cardEntries.some(({ cardId, quantity }) => isNaN(cardId) || isNaN(quantity))) {
    return await ctx.reply('Неверный формат данных карт');
  }

  if (target === 'all') {
    let totalGiven = 0;
    for (const { cardId, quantity } of cardEntries) {
      const givenCount = await giveCardsToAllUsers(cardId, quantity, ctx.from!.id.toString());
      totalGiven += givenCount * quantity;
    }
    await ctx.reply(`✅ Выдано ${totalGiven} карт всем пользователям`);
  } else {
    const username = target.replace('@', '');
    const user = await findUser(username);
    if (!user) {
      return await ctx.reply('Пользователь не найден');
    }

    for (const { cardId, quantity } of cardEntries) {
      const card = await prisma.card.findUnique({ where: { id: cardId }, select: { name: true } });
      if (!card) {
        await ctx.reply(`❌ Карта с ID ${cardId} не найдена`);
        continue;
      }
      await giveCardsToUser(user.id, cardId, quantity, ctx.from!.id.toString());
      await logAction('CARDS_GIVE', user.id, { cardId, cardName: card.name, quantity }, ctx.from!.id.toString());
    }
    await ctx.reply(`✅ Выдано карт пользователю @${user.username}`);
  }
}

export async function handleTakeCardsAction(ctx: Context, messageText: string) {
  const [usernameInput, cardIdStr, quantityStr] = messageText.split(' ');
  const username = usernameInput.replace('@', '');
  const cardId = parseInt(cardIdStr);
  const quantity = parseInt(quantityStr);

  if (isNaN(cardId) || isNaN(quantity)) {
    return await ctx.reply('Неверный формат данных');
  }

  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  await takeCardsFromUser(user.id, cardId, quantity, ctx.from!.id.toString());
  await logAction('CARDS_TAKE', user.id, { cardId, quantity }, ctx.from!.id.toString());
  await ctx.reply(`✅ Изъято ${quantity} карт (ID: ${cardId}) у @${user.username}`);
}

export async function handleViewCollectionAction(ctx: Context, messageText: string) {
  const username = messageText.trim().replace('@', '');
  const user = await findUser(username);
  if (!user) {
    return await ctx.reply('Пользователь не найден');
  }

  const collection = await getUserCollection(user.id);
  if (collection.length === 0) {
    return await ctx.reply(`Коллекция @${user.username} пуста`);
  }

  const rarityOrder = ['ultrasoft', 'supersoft', 'soft', 'medium', 'hard', 'intermediate', 'wet'];
  const groupedByRarity = collection.reduce((acc: Record<string, any[]>, item) => {
    const rarity = item.card.rarity;
    acc[rarity] = acc[rarity] || [];
    acc[rarity].push(item);
    return acc;
  }, {});

  let response = `🗂 Коллекция пользователя @${user.username || user.telegramId}\n\n`;
  let uniqueCards = 0;
  let totalCards = 0;

  for (const rarity of rarityOrder) {
    const cards = groupedByRarity[rarity] || [];
    if (!cards.length) continue;

    response += `📌 ${rarity.toUpperCase()}:\n`;
    uniqueCards += cards.length;
    totalCards += cards.reduce((sum, item) => sum + item.quantity, 0);

    cards.slice(0, 10).forEach(item => {
      response += `• ${item.card.name} (x${item.quantity})\n`;
    });

    if (cards.length > 10) {
      response += `• ... и еще ${cards.length - 10} карт\n`;
    }
    response += '\n';
  }

  response += `📊 Итого: ${uniqueCards} уникальных карт, ${totalCards} всего`;

  const maxLength = 4000;
  let parts = [];
  while (response.length > maxLength) {
    let part = response.substring(0, maxLength);
    let lastNewline = part.lastIndexOf('\n');
    parts.push(response.substring(0, lastNewline > 0 ? lastNewline : maxLength));
    response = response.substring(lastNewline > 0 ? lastNewline + 1 : maxLength);
  }
  parts.push(response);

  for (const part of parts) {
    await ctx.reply(part);
  }
}

// Functions from original helpers.ts
export async function giveCardsToUser(userId: number, cardId: number, quantity: number, issuedBy: string) {
  const existing = await prisma.userCard.findUnique({ where: { userId_cardId: { userId, cardId } } });

  if (existing) {
    return prisma.userCard.update({
      where: { userId_cardId: { userId, cardId } },
      data: { quantity: existing.quantity + quantity }
    });
  }

  return prisma.userCard.create({ data: { userId, cardId, quantity } });
}

export async function takeCardsFromUser(userId: number, cardId: number, quantity: number, takenBy: string) {
  const existing = await prisma.userCard.findUnique({ where: { userId_cardId: { userId, cardId } } });
  if (!existing) throw new Error('У пользователя нет такой карты');
  if (existing.quantity < quantity) throw new Error(`Недостаточно карт. Только ${existing.quantity} шт.`);

  if (existing.quantity === quantity) {
    return prisma.userCard.delete({ where: { userId_cardId: { userId, cardId } } });
  }

  return prisma.userCard.update({
    where: { userId_cardId: { userId, cardId } },
    data: { quantity: existing.quantity - quantity }
  });
}

export async function getUserCollection(userId: number) {
  return prisma.userCard.findMany({
    where: { userId },
    include: { card: { select: { id: true, name: true, type: true, rarity: true, team: true } } },
    orderBy: [{ card: { rarity: 'asc' } }, { card: { name: 'asc' } }]
  });
}

export async function giveCardsToAllUsers(cardId: number, quantity: number, issuedBy: string) {
  const users = await findAllUsers();
  const card = await prisma.card.findUnique({ where: { id: cardId }, select: { name: true } });
  if (!card) throw new Error(`Карта с ID ${cardId} не найдена`);

  let givenCount = 0;
  for (const user of users) {
    try {
      await giveCardsToUser(user.id, cardId, quantity, issuedBy);
      await logAction('CARDS_GIVE', user.id, { cardId, cardName: card.name, quantity }, issuedBy);
      givenCount++;
    } catch (error) {
      console.error(`Ошибка выдачи карты пользователю ${user.id}:`, error);
    }
  }
  return givenCount;
}