// src/admin/keyboards.ts (unchanged, as it's already clean)
import { InlineKeyboardButton } from 'telegraf/types';

type KeyboardButton = [string, string]; 

const buildKeyboard = (rows: KeyboardButton[][]) => ({
  inline_keyboard: rows.map(row => row.map(([text, data]) => ({ text, callback_data: data })))
});

export const getAdminKeyboard = () => buildKeyboard([
  [['🖼 Загрузить карты', 'admin_upload_cards_confirm'], ['➕ Добавить пак', 'admin_add_pack']],
  [['✏️ Изменить карту', 'admin_edit_card'], ['🎴 Управление картами', 'admin_cards_menu']],
  [['⛔️ Баны/Предупреждения', 'admin_ban_menu'], ['💰 Управление монетами', 'admin_coins_menu']],
  [['👤 Логи пользователя', 'admin_user_logs']],
  [['❌ Закрыть', 'admin_close']]
]);

export const getCoinsKeyboard = () => buildKeyboard([
  [['🎯 Выдать одному', 'admin_give_coins_single'], ['🎁 Выдать всем', 'admin_give_coins_all']],
  [['➖ Списать у одного', 'admin_take_coins_single'], ['➖ Списать у всех', 'admin_take_coins_all']],
  [['↩️ Назад', 'admin_back']]
]);

export const getBanKeyboard = () => buildKeyboard([
  [['🔴 Перманентный бан', 'admin_ban_permanent'], ['🟡 Временный бан', 'admin_ban_temporary']],
  [['🟢 Разбан', 'admin_unban'], ['⚠️ Предупреждение', 'admin_warning']],
  [['🔓 Снять ограничения', 'admin_unrestrict']],
  [['↩️ Назад', 'admin_back']]
]);

export const getCardEditKeyboard = () => buildKeyboard([
  [['1. Название', 'edit_card_field_1'], ['2. Тип', 'edit_card_field_2'], ['3. Команда', 'edit_card_field_3']],
  [['4. Редкость', 'edit_card_field_4'], ['5. Описание', 'edit_card_field_5'], ['6. ID пака', 'edit_card_field_6']],
  [['7. Дропается', 'edit_card_field_7'], ['8. Лимит дропа', 'edit_card_field_8'], ['9. Год', 'edit_card_field_9']],
  [['🔍 Другая карта', 'edit_card_another'], ['↩️ В админку', 'edit_card_back_to_admin']]
]);

export const getCardEditNavigationKeyboard = () => buildKeyboard([
  [['✏️ Редактировать дальше', 'edit_card_continue'], ['🔍 Другая карта', 'edit_card_another']],
  [['↩️ В админку', 'edit_card_back_to_admin']]
]);

export const getCardsKeyboard = () => buildKeyboard([
  [['🎴 Выдать карты', 'admin_give_cards'], ['➖ Забрать карты', 'admin_take_cards']],
  [['👀 Просмотр коллекции', 'admin_view_collection']],
  [['↩️ Назад', 'admin_back']]
]);

export const getUserLogsKeyboard = () => buildKeyboard([
  [['🔄 Обмены', 'user_logs_trades'], ['🛒 Покупки', 'user_logs_purchases']],
  [['💰 Продажи', 'user_logs_sales'], ['🎴 Передачи карт', 'user_logs_transfers']],
  [['🎮 Игры', 'user_logs_games'], ['📊 Все действия', 'user_logs_all']],
  [['📅 За период', 'user_logs_period'], ['↩️ Назад', 'admin_back']]
]);

export const getDateSelectionKeyboard = () => buildKeyboard([
  [['📅 Сегодня', 'logs_date_today'], ['📅 Вчера', 'logs_date_yesterday']],
  [['📅 Неделя', 'logs_date_week'], ['📅 Месяц', 'logs_date_month']],
  [['📅 Произвольная дата', 'logs_date_custom'], ['↩️ Назад', 'user_logs_back']]
]);