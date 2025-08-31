import { useState } from 'react'
import { X, Gift, Coins } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Card {
  id: string
  name: string
  rarity:
    | 'ultrasoft'
    | 'supersoft'
    | 'soft'
    | 'medium'
    | 'hard'
    | 'intermediate'
    | 'wet'
  type:
    | 'driver'
    | 'duo'
    | 'team'
    | 'team_principal'
    | 'track'
    | 'car'
    | 'collab'
    | 'historical'
    | 'race_results'
    | 'limited'
    | 'special'
  team?: string
  location?: string
}

interface CardModalProps {
  card: Card | null
  isOpen: boolean
  onClose: () => void
  onSell: (cardId: string, price: number) => void
  onGift: (cardId: string, playerName: string) => void
}

const CardModal = ({ card, isOpen, onClose, onSell, onGift }: CardModalProps) => {
  const [action, setAction] = useState<'view' | 'sell' | 'gift'>('view')
  const [sellPrice, setSellPrice] = useState(100)
  const [giftPlayerName, setGiftPlayerName] = useState('')

  if (!isOpen || !card) return null

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'ultrasoft':
        return 'from-pink-400 to-pink-600 border-pink-400'
      case 'supersoft':
        return 'from-red-400 to-red-600 border-red-400'
      case 'soft':
        return 'from-yellow-400 to-yellow-600 border-yellow-400'
      case 'medium':
        return 'from-white to-gray-200 border-white'
      case 'hard':
        return 'from-orange-400 to-orange-600 border-orange-400'
      case 'intermediate':
        return 'from-green-400 to-green-600 border-green-400'
      case 'wet':
        return 'from-blue-400 to-blue-600 border-blue-400'
      default:
        return 'from-gray-400 to-gray-500 border-gray-400'
    }
  }

  const handleSell = () => {
    if (sellPrice > 0) {
      onSell(card.id, sellPrice)
      onClose()
    }
  }

  const handleGift = () => {
    if (giftPlayerName.trim()) {
      onGift(card.id, giftPlayerName.trim())
      onClose()
    }
  }

  const resetToView = () => {
    setAction('view')
    setSellPrice(100)
    setGiftPlayerName('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-4xl bg-gray-900 rounded-xl border border-gray-700/50 overflow-hidden flex"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => {
                resetToView()
                onClose()
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 transition-colors"
            >
              <X size={24} />
            </button>

            {action === 'view' && (
              <>
                <motion.div
                  className="w-1/2 flex items-center justify-center p-6"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <div
                    className={`w-48 h-64 bg-gradient-to-r ${getRarityColors(
                      card.rarity
                    )} rounded-xl border-2 flex flex-col items-center justify-center`}
                  >
                    <span className="text-white">IMG</span>
                  </div>
                </motion.div>

                <motion.div
                  className="w-1/2 p-6 flex flex-col justify-between"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                >
                  <div className="flex flex-col items-center text-center mb-6">
                    <h3 className="font-bold text-white text-xl mb-2">
                      {card.name}
                    </h3>
                    {card.team && (
                      <p className="text-white/80 text-sm mb-2">{card.team}</p>
                    )}
                    {card.location && (
                      <p className="text-white/80 text-sm mb-2">
                        {card.location}
                      </p>
                    )}
                    <span className="inline-block px-3 py-1 bg-black/30 rounded-full text-sm text-white">
                      {card.rarity} {card.type}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setAction('sell')}
                      className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      <Coins size={20} />
                      Продать карту
                    </button>

                    <button
                      onClick={() => setAction('gift')}
                      className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      <Gift size={20} />
                      Подарить игроку
                    </button>
                  </div>
                </motion.div>
              </>
            )}

            {action === 'sell' && (
              <div className="flex w-full p-6 flex-col">
                <h3 className="text-xl font-bold text-white mb-4">Продать карту</h3>
                <div className="mb-6">
                  <p className="text-gray-300 mb-4">Установите цену для продажи:</p>
                  <div className="relative">
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(Number(e.target.value))}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-f1-red"
                      min="1"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                      <Coins size={16} className="text-f1-orange" />
                      <span className="text-gray-400 text-sm">монет</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={resetToView}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleSell}
                    disabled={sellPrice <= 0}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors"
                  >
                    Продать
                  </button>
                </div>
              </div>
            )}

            {action === 'gift' && (
              <div className="flex w-full p-6 flex-col">
                <h3 className="text-xl font-bold text-white mb-4">Подарить карту</h3>
                <div className="mb-6">
                  <p className="text-gray-300 mb-4">Введите имя игрока:</p>
                  <input
                    type="text"
                    value={giftPlayerName}
                    onChange={(e) => setGiftPlayerName(e.target.value)}
                    placeholder="Имя игрока"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-f1-red"
                  />
                </div>

                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={resetToView}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleGift}
                    disabled={!giftPlayerName.trim()}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors"
                  >
                    Подарить
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CardModal