"""creada tabla BankData

Revision ID: ac8d30fe326d
Revises: 8478539da416
Create Date: 2024-06-06 01:16:10.796351

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac8d30fe326d'
down_revision = '8478539da416'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bank_data',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('card_number', sa.String(length=20), nullable=False),
    sa.Column('cardholder_name', sa.String(length=80), nullable=False),
    sa.Column('expiry_date', sa.String(length=5), nullable=False),
    sa.Column('cvv', sa.String(length=4), nullable=False),
    sa.Column('is_default', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bank_data')
    # ### end Alembic commands ###