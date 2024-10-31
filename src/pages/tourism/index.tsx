import CModal from '@/components/common/CModal';
import Library from '@/components/common/Library';
import { getPathAsset } from '@/components/common/Library/utils';
import {
  useCreateCategoryMutation,
  useGetListCategoryQuery,
  useUpdateCategoryMutation,
} from '@/redux/services/categoryApi';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, InputRef, Space, Table, TableColumnType } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { ColumnsType } from 'antd/lib/table';
import { useEffect, useRef, useState } from 'react';

const Tourism = () => {
  const [open, setOpen] = useState(false);
  const [itemEdit, setItemEdit] = useState<SCHEMA.Category>();
  const [runCreateCategoryMutation] = useCreateCategoryMutation({});
  const [runUpdateCategoryMutation] = useUpdateCategoryMutation({});

  const [form] = Form.useForm();

  const getListCategoryQuery = useGetListCategoryQuery({
    params: {
      limit: 100,
      page: 1,
    },
  });

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={'Tìm kiếm'}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            size="small"
            type='primary'
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              if (!clearFilters) return;
              handleReset(clearFilters)
              confirm({ closeDropdown: true });
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<SCHEMA.Category> | undefined = [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      render(value, record, index) {
        return index + 1;
      },
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render(value) {
        return (
          <img
            src={getPathAsset(value)}
            alt={value}
            style={{ width: 100 }}
          />
        );
      },
    },
    {
      title: 'Chức năng',
      dataIndex: 'func',
      key: 'func',
      render(value, record) {
        return (
          <Space size="small">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                form.setFieldsValue({
                  title: record.name,
                  thumbnail: record.thumbnail,
                  description: record.description,
                });
                setOpen(true);
                setItemEdit(record);
              }}
            />
            <Button
              size="small"
              icon={<DeleteOutlined />}
              color="danger"
              className="text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                // onDelete(record);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (itemEdit) {
      await runUpdateCategoryMutation({
        body: {
          name: values.title,
          thumbnail: values.thumbnail,
          description: values.description,
        },
        params: {
          id: itemEdit.id,
        },
      });
      setOpen(false);
      return;
    }
    await runCreateCategoryMutation({
      body: {
        name: values.title,
        thumbnail: values.thumbnail,
        description: values.description,
      },
    });
    setOpen(false);
  };

  const submitForm = (values: any) => {
    console.log(values);
    // form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setItemEdit(undefined);
    }
  }, [open]);

  console.log('getListCategoryQuery', getListCategoryQuery);

  return (
    <Flex vertical>
      <Flex>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            form.resetFields();
            setOpen(true);
          }}
        >
          Thêm mới
        </Button>
      </Flex>

      <Table<SCHEMA.Category>
        dataSource={getListCategoryQuery.data?.data?.items || []}
        columns={columns}
      />

      <CModal
        title="Tạo loại hình mới"
        centered
        open={open}
        onOk={onSubmit}
        onCancel={() => setOpen(false)}
      >
        <Form
          form={form}
          name="wrap"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 600 }}
          onFinish={submitForm}
        >
          <Form.Item
            label="Tên loại hình"
            name="title"
            rules={[{ required: true, message: 'Nhập tên loại hình' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            required
            name="thumbnail"
            label="Ảnh Thumbnail"
          >
            <Library />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Nhập mô tả về địa danh' }]}
          >
            <Input.TextArea />
          </Form.Item>

          {/* <Form.Item label=" ">
            <Button
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </CModal>
    </Flex>
  );
};

export default Tourism;
