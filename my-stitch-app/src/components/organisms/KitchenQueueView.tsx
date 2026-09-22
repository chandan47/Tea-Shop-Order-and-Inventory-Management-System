import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { KitchenTicket } from '../../data/mockData';

export interface KitchenQueueViewProps {
  readonly tickets: readonly KitchenTicket[];
  readonly onMarkCashCollected: (ticketId: string) => void;
  readonly onMarkReady: (ticketId: string) => void;
  readonly onMarkHandover: (ticketId: string) => void;
  readonly testID?: string;
}

interface ColumnConfig {
  readonly stageId: KitchenTicket['stage'];
  readonly title: string;
  readonly color: string;
  readonly borderColor: string;
  readonly bgColor: string;
}

const COLUMNS: readonly ColumnConfig[] = [
  {
    stageId: 'pending_cash',
    title: '💰 Pending Cash',
    color: colors.statusAmberText,
    borderColor: colors.statusAmberBorder,
    bgColor: colors.statusAmberBg,
  },
  {
    stageId: 'brewing',
    title: '🔥 Brewing',
    color: colors.secondary,
    borderColor: colors.secondaryFixed,
    bgColor: colors.secondaryFixed,
  },
  {
    stageId: 'ready',
    title: '✅ Ready',
    color: colors.statusGreenText,
    borderColor: colors.statusGreenBorder,
    bgColor: colors.statusGreenBg,
  },
  {
    stageId: 'handover',
    title: '🤝 Handover',
    color: colors.onSurfaceVariant,
    borderColor: colors.outlineVariant,
    bgColor: colors.surfaceContainer,
  },
];

export const KitchenQueueView: React.FC<KitchenQueueViewProps> = ({
  tickets,
  onMarkCashCollected,
  onMarkReady,
  onMarkHandover,
  testID,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.kanban}
      testID={testID}
    >
      {COLUMNS.map((col) => {
        const colTickets = tickets.filter((t) => t.stage === col.stageId);
        return (
          <View key={col.stageId} style={styles.column}>
            {/* Column header */}
            <View
              style={[
                styles.colHeader,
                { backgroundColor: col.bgColor, borderColor: col.borderColor },
              ]}
            >
              <Text style={[styles.colTitle, { color: col.color }]}>{col.title}</Text>
              <View style={[styles.colCount, { backgroundColor: col.color }]}>
                <Text style={styles.colCountText}>{colTickets.length}</Text>
              </View>
            </View>

            {/* Ticket cards */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.colBody}>
              {colTickets.length === 0 && (
                <Text style={styles.emptyText}>No orders</Text>
              )}
              {colTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onMarkCashCollected={onMarkCashCollected}
                  onMarkReady={onMarkReady}
                  onMarkHandover={onMarkHandover}
                />
              ))}
            </ScrollView>
          </View>
        );
      })}
    </ScrollView>
  );
};

interface TicketCardProps {
  readonly ticket: KitchenTicket;
  readonly onMarkCashCollected: (id: string) => void;
  readonly onMarkReady: (id: string) => void;
  readonly onMarkHandover: (id: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onMarkCashCollected,
  onMarkReady,
  onMarkHandover,
}) => {
  return (
    <View style={ticketStyles.card}>
      {/* Header */}
      <View style={ticketStyles.cardHeader}>
        <Text style={ticketStyles.ticketNum}>{ticket.ticketNumber}</Text>
        <Badge
          label={ticket.paymentType}
          variant={ticket.paymentStatus === 'PAID' ? 'pairing' : 'highlight'}
        />
      </View>

      {/* Source + time */}
      <Text style={ticketStyles.source}>{ticket.orderSource}</Text>
      <Text style={ticketStyles.time}>{ticket.timeAgo}</Text>

      {/* Items */}
      <View style={ticketStyles.items}>
        {ticket.items.map((item, idx) => (
          <View key={idx} style={ticketStyles.itemRow}>
            <Text style={ticketStyles.itemQty}>×{item.quantity}</Text>
            <View style={ticketStyles.itemInfo}>
              <Text style={ticketStyles.itemName}>{item.name}</Text>
              {item.notes && (
                <Text style={ticketStyles.itemNote}>{item.notes}</Text>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Customer note */}
      {ticket.customerNote && (
        <View style={ticketStyles.noteBox}>
          <Text style={ticketStyles.noteText}>📝 {ticket.customerNote}</Text>
        </View>
      )}

      {/* BOM details */}
      {ticket.bomDetails && (
        <Text style={ticketStyles.bom}>{ticket.bomDetails}</Text>
      )}

      {/* Amount */}
      <Text style={ticketStyles.amount}>₹{ticket.amount}</Text>

      {/* Action buttons */}
      {ticket.stage === 'pending_cash' && (
        <Button
          label="✅ Cash Collected"
          onPress={() => onMarkCashCollected(ticket.id)}
          variant="secondary"
          size="sm"
          testID={`cash-collected-${ticket.id}`}
        />
      )}
      {ticket.stage === 'brewing' && (
        <Button
          label="🔔 Mark Ready"
          onPress={() => onMarkReady(ticket.id)}
          variant="primary"
          size="sm"
          testID={`mark-ready-${ticket.id}`}
        />
      )}
      {ticket.stage === 'ready' && (
        <Button
          label="🤝 Handover"
          onPress={() => onMarkHandover(ticket.id)}
          variant="ghost"
          size="sm"
          testID={`handover-${ticket.id}`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  kanban: {
    paddingHorizontal: spacing.spaceSm,
    paddingVertical: spacing.spaceMd,
    gap: spacing.spaceSm,
  },
  column: {
    width: 240,
    gap: spacing.spaceSm,
  },
  colHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.spaceMd,
    paddingVertical: spacing.spaceXs + 2,
  },
  colTitle: {
    ...typography.headlineSm,
  },
  colCount: {
    width: 20,
    height: 20,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colCountText: {
    ...typography.labelSm,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  colBody: {
    flexGrow: 0,
  },
  emptyText: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.spaceLg,
  },
});

const ticketStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.spaceMd,
    marginBottom: spacing.spaceSm,
    gap: spacing.spaceXs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ticketNum: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  source: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
  },
  time: {
    ...typography.labelSm,
    color: colors.primary,
  },
  items: {
    gap: spacing.spaceXs,
    marginTop: spacing.spaceXs,
  },
  itemRow: {
    flexDirection: 'row',
    gap: spacing.spaceXs,
    alignItems: 'flex-start',
  },
  itemQty: {
    ...typography.labelMd,
    color: colors.primary,
    width: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  itemNote: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  noteBox: {
    backgroundColor: colors.statusAmberBg,
    borderRadius: borderRadius.lg,
    padding: spacing.spaceXs + 2,
    borderWidth: 1,
    borderColor: colors.statusAmberBorder,
  },
  noteText: {
    ...typography.bodySm,
    color: colors.statusAmberText,
  },
  bom: {
    ...typography.bodySm,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  amount: {
    ...typography.headlineSm,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'right',
  },
});

export default KitchenQueueView;
