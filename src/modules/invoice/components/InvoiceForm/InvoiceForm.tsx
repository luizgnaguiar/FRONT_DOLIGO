import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { CreateInvoiceSchema, type CreateInvoiceSchemaType } from '@api/schemas/invoice';
import { Button, Input, Text } from '@shared/ui';
import styles from './InvoiceForm.module.css';

interface InvoiceFormProps {
  initialValues?: Partial<CreateInvoiceSchemaType>;
  onSubmit: (data: CreateInvoiceSchemaType) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel = 'Salvar Invoice',
}) => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateInvoiceSchemaType>({
    resolver: zodResolver(CreateInvoiceSchema),
    defaultValues: initialValues || {
      customerName: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      items: [{ description: '', quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {Object.keys(errors).length > 0 && (
        <div className={styles.errorSummary}>
          <Text color="error" weight="medium">
            Por favor, corrija os erros abaixo.
          </Text>
        </div>
      )}

      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Dados Gerais</Text>
        <div className={styles.row}>
          <Input
            label="Cliente"
            placeholder="Nome do cliente"
            error={errors.customerName?.message}
            {...register('customerName')}
          />
          <Input
            label="Data de Emissão"
            type="date"
            error={errors.issueDate?.message}
            {...register('issueDate')}
          />
          <Input
            label="Data de Vencimento"
            type="date"
            error={errors.dueDate?.message}
            {...register('dueDate')}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.itemsHeader}>
          <Text className={styles.sectionTitle}>Itens</Text>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
          >
            Adicionar Item
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className={styles.itemRow}>
            <div className={styles.itemInput} style={{ flex: 3 }}>
              <Input
                label="Descrição"
                placeholder="Descrição do item"
                error={errors.items?.[index]?.description?.message}
                {...register(`items.${index}.description`)}
              />
            </div>
            <div className={styles.itemInput}>
              <Controller
                control={control}
                name={`items.${index}.quantity`}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Qtd"
                    type="number"
                    min="1"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={errors.items?.[index]?.quantity?.message}
                  />
                )}
              />
            </div>
            <div className={styles.itemInput}>
              <Controller
                control={control}
                name={`items.${index}.unitPrice`}
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Preço Unit."
                    type="number"
                    min="0"
                    step="0.01"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    error={errors.items?.[index]?.unitPrice?.message}
                  />
                )}
              />
            </div>
            <div className={styles.itemAction}>
              <Button
                type="button"
                variant="outline" // Should be destructive style ideally
                size="sm"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                Remover
              </Button>
            </div>
          </div>
        ))}
        {errors.items?.root && (
           <Text color="error" size="sm">{errors.items.root.message}</Text>
        )}
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={() => navigate('/invoices')}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
