"""empty message

Revision ID: 383780b73119
Revises: 2b2d4cf19ba5
Create Date: 2022-07-06 20:25:06.848877

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '383780b73119'
down_revision = '2b2d4cf19ba5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('subscriber',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('Subscribers')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Subscribers',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='Subscribers_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', name='Subscribers_pkey')
    )
    op.drop_table('subscriber')
    # ### end Alembic commands ###
