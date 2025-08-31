// src/admin/messageHandler.ts (updated)
import { Context } from 'telegraf';
import { adminStates } from './handlers';
import { 
  handleCardUpload, handlePackCreation, handleCardEdit, handleCardEditEnterValue, 
  handleGiveCardsAction, handleTakeCardsAction, handleViewCollectionAction
} from './cards';
import { handleBanPermanentAction, handleBanTemporaryAction, handleUnbanAction, handleWarningAction, handleUnrestrictAction } from './ban';
import { handleCoinTransactionSingle, handleCoinTransactionAll } from './coins';
import { handleUserLogsUsername, handleUserLogsCustomDate, showUserLogs } from './logs';

export async function handleAdminMessage(ctx: Context) {
  const userId = ctx.from?.id.toString();
  const messageText = (ctx.message as any)?.text;
  const photo = (ctx.message as any)?.photo;

  if (!userId || (!messageText && !photo)) return;

  const state = adminStates.get(userId);
  if (!state) return;

  try {
    switch (state.action) {
      case 'upload_cards':
        if (photo) await handleCardUpload(ctx, state, photo, messageText || '');
        break;
      case 'add_pack':
        if (messageText) await handlePackCreation(ctx, messageText);
        break;
      case 'edit_card':
        if (messageText) await handleCardEdit(ctx, messageText);
        break;
      case 'edit_card_enter_value':
        if (messageText) await handleCardEditEnterValue(ctx, messageText, state);
        break;
      case 'ban_permanent':
        if (messageText) await handleBanPermanentAction(ctx, messageText);
        break;
      case 'ban_temporary':
        if (messageText) await handleBanTemporaryAction(ctx, messageText);
        break;
      case 'unban':
        if (messageText) await handleUnbanAction(ctx, messageText);
        break;
      case 'warning':
        if (messageText) await handleWarningAction(ctx, messageText);
        break;
      case 'unrestrict':
        if (messageText) await handleUnrestrictAction(ctx, messageText);
        break;
      case 'give_coins_single':
        if (messageText) await handleCoinTransactionSingle(ctx, messageText, 'add');
        break;
      case 'give_coins_all':
        if (messageText) await handleCoinTransactionAll(ctx, messageText, 'add');
        break;
      case 'take_coins_single':
        if (messageText) await handleCoinTransactionSingle(ctx, messageText, 'remove');
        break;
      case 'take_coins_all':
        if (messageText) await handleCoinTransactionAll(ctx, messageText, 'remove');
        break;
      case 'give_cards':
        if (messageText) await handleGiveCardsAction(ctx, messageText);
        break;
      case 'take_cards':
        if (messageText) await handleTakeCardsAction(ctx, messageText);
        break;
      case 'view_collection':
        if (messageText) await handleViewCollectionAction(ctx, messageText);
        break;
      case 'user_logs_username':
        if (messageText) await handleUserLogsUsername(ctx, messageText, state.data?.logType || 'all');
        break;
      case 'user_logs_custom_date':
        if (messageText) await handleUserLogsCustomDate(ctx, messageText);
        break;
      case 'user_logs_filter':
        await showUserLogs(ctx, state.data.username, state.data.logType || 'all');
        break;
    }
  } catch (error) {
    console.error('Admin message error:', error);
    await ctx.reply(`Ошибка обработки запроса: ${(error as Error).message}`);
  } finally {
    if (!['edit_card', 'edit_card_enter_value', 'user_logs_username', 'user_logs_custom_date', 'user_logs_filter'].includes(state.action)) {
      adminStates.delete(userId);
    }
  }
}

export function adminMessageMiddleware() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const userId = ctx.from?.id.toString();
    if (!userId) return next();

    const state = adminStates.get(userId);
    if (state) {
      await handleAdminMessage(ctx);
    } else {
      return next();
    }
  };
}