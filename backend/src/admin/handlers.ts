// src/admin/handlers.ts (updated)
import { Context } from 'telegraf';
import { prisma } from '../db/client';
import { isAdmin, logAction } from './utils';
import { getAdminKeyboard } from './keyboards';
import { handleBackToAdmin } from './utils'; // Moved common back to admin to utils
import { 
  handleUploadCards, handleUploadCardsConfirm, handleUploadCardsStart, handleAddPack, handleEditCard, handleEditCardField, 
  handleEditCardCancelField, handleEditCardContinue, handleEditAnotherCard, handleBackToAdminFromEdit, handleEditCardConfirm,
  handleCardsMenu, handleGiveCards, handleTakeCards, handleViewCollection
} from './cards';
import { handleBanMenu, handleBanPermanent, handleBanTemporary, handleUnban, handleWarning, handleUnrestrict } from './ban';
import { handleCoinsMenu, handleGiveCoinsSingle, handleGiveCoinsAll, handleTakeCoinsSingle, handleTakeCoinsAll } from './coins';
import { handleUserLogsTypeChange, handleUserLogsPeriod, handleLogsDate, handleLogsDateCustom } from './logs';

// Состояния для админских действий
export const adminStates = new Map<string, { action: string; data?: any }>();

// Обработчик команды /admin
export async function handleAdminCommand(ctx: Context) {
  const userId = ctx.from?.id.toString();
  if (!userId || !(await isAdmin(userId))) {
    await ctx.reply('Доступ запрещен.');
    return;
  }

  await ctx.reply('Панель администратора:', { reply_markup: getAdminKeyboard() });
}

// Обработчики callback-запросов
export async function handleAdminCallback(ctx: Context) {
  const callbackData = (ctx.callbackQuery as any)?.data;
  const userId = ctx.from?.id.toString();

  if (!userId || !callbackData || !(await isAdmin(userId))) {
    await ctx.answerCbQuery('Доступ запрещен');
    return;
  }

  try {
    switch (callbackData) {
      case 'admin_upload_cards_confirm':
        await handleUploadCardsConfirm(ctx);
        break;
      case 'admin_upload_cards_start':
        await handleUploadCardsStart(ctx);
        break;
      case 'admin_add_pack':
        await handleAddPack(ctx);
        break;
      case 'admin_edit_card':
        await handleEditCard(ctx);
        break;
      case 'admin_ban_menu':
        await handleBanMenu(ctx);
        break;
      case 'admin_ban_permanent':
        await handleBanPermanent(ctx);
        break;
      case 'admin_ban_temporary':
        await handleBanTemporary(ctx);
        break;
      case 'admin_unban':
        await handleUnban(ctx);
        break;
      case 'admin_warning':
        await handleWarning(ctx);
        break;
      case 'admin_unrestrict':
        await handleUnrestrict(ctx);
        break;
      case 'admin_coins_menu':
        await handleCoinsMenu(ctx);
        break;
      case 'admin_give_coins_single':
        await handleGiveCoinsSingle(ctx);
        break;
      case 'admin_give_coins_all':
        await handleGiveCoinsAll(ctx);
        break;
      case 'admin_take_coins_single':
        await handleTakeCoinsSingle(ctx);
        break;
      case 'admin_take_coins_all':
        await handleTakeCoinsAll(ctx);
        break;
      case 'admin_back':
        await handleBackToAdmin(ctx);
        break;
      case 'admin_close':
        await ctx.deleteMessage();
        break;
      case 'edit_card_field_1':
        await handleEditCardField(ctx, 'name');
        break;
      case 'edit_card_field_2':
        await handleEditCardField(ctx, 'type');
        break;
      case 'edit_card_field_3':
        await handleEditCardField(ctx, 'team');
        break;
      case 'edit_card_field_4':
        await handleEditCardField(ctx, 'rarity');
        break;
      case 'edit_card_field_5':
        await handleEditCardField(ctx, 'description');
        break;
      case 'edit_card_field_6':
        await handleEditCardField(ctx, 'packId');
        break;
      case 'edit_card_field_7':
        await handleEditCardField(ctx, 'isDroppable');
        break;
      case 'edit_card_field_8':
        await handleEditCardField(ctx, 'dropLimit');
        break;
      case 'edit_card_field_9':
        await handleEditCardField(ctx, 'year');
        break;
      case 'edit_card_another':
        await handleEditAnotherCard(ctx);
        break;
      case 'edit_card_back_to_admin':
        await handleBackToAdminFromEdit(ctx);
        break;
      case 'edit_card_confirm':
        await handleEditCardConfirm(ctx);
        break;
      case 'edit_card_cancel_field':
        await handleEditCardCancelField(ctx);
        break;
      case 'edit_card_continue':
        await handleEditCardContinue(ctx);
        break;
      case 'admin_cards_menu':
        await handleCardsMenu(ctx);
        break;
      case 'admin_give_cards':
        await handleGiveCards(ctx);
        break;
      case 'admin_take_cards':
        await handleTakeCards(ctx);
        break;
      case 'admin_view_collection':
        await handleViewCollection(ctx);
        break;
      case 'admin_user_logs':
        adminStates.set(ctx.from!.id.toString(), { action: 'user_logs_username', data: { logType: 'all' } });
        await ctx.reply('Введите username пользователя для просмотра всех логов:\n\nПример: "@username"');
        await ctx.answerCbQuery();
        break;
      case 'user_logs_trades':
        await handleUserLogsTypeChange(ctx, 'trades');
        break;
      case 'user_logs_purchases':
        await handleUserLogsTypeChange(ctx, 'purchases');
        break;
      case 'user_logs_sales':
        await handleUserLogsTypeChange(ctx, 'sales');
        break;
      case 'user_logs_transfers':
        await handleUserLogsTypeChange(ctx, 'transfers');
        break;
      case 'user_logs_games':
        await handleUserLogsTypeChange(ctx, 'games');
        break;
      case 'user_logs_all':
        await handleUserLogsTypeChange(ctx, 'all');
        break;
      case 'user_logs_period':
        await handleUserLogsPeriod(ctx);
        break;
      case 'user_logs_back':
        await handleBackToAdmin(ctx);
        break;
      case 'logs_date_today':
        await handleLogsDate(ctx, 'today');
        break;
      case 'logs_date_yesterday':
        await handleLogsDate(ctx, 'yesterday');
        break;
      case 'logs_date_week':
        await handleLogsDate(ctx, 'week');
        break;
      case 'logs_date_month':
        await handleLogsDate(ctx, 'month');
        break;
      case 'logs_date_custom':
        await handleLogsDateCustom(ctx);
        break;
      default:
        await ctx.answerCbQuery('Неизвестная команда');
        break;
    }
  } catch (error) {
    console.error('Admin error:', error);
    await ctx.answerCbQuery('Произошла ошибка');
  }
}